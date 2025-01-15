<?php


function approve(){
    global $g5,$member;
    
    if($member['mb_id'] != 'admin'){
        echo "권한이없습니다.";
        exit;
    }
    $mb_id = $_POST['mb_id'];

    $member = sql_fetch("SELECT * FROM {$g5['member_table']} WHERE mb_id = '{$mb_id}' AND mb_level = 1");

    if(empty($member)){
        echo ("이미 승인이된 회원입니다.");
        exit;
    }
    $mb_recommend = $member['mb_recommend'];
    if (!$member) return null;

    if(empty($mb_recommend)){
        echo ("추천인이 없는 회원입니다.");
        exit;
    }

    // 추천인 트리에서 빈 자리 찾기
    $empty_slot = find_empty_slot($mb_recommend);
    if (!$empty_slot) {
        echo ("추천인의 모든 자리가 가득 찼습니다.");
        exit;
    }

    // 빈 자리 정보에 새 사용자 배치
    $parent_id = $empty_slot['parent_id'];
    $position = $empty_slot['position'];
    sql_query("UPDATE {$g5['member_table']} SET {$position} = '{$mb_id}' WHERE mb_id = '{$parent_id}' limit 1");
    sql_query("UPDATE {$g5['member_table']} SET mb_level = 2 WHERE mb_id = '{$mb_id}' limit 1");

    echo "Y";
}

function get_tree($mb_id)
{
    global $g5;

    $member = sql_fetch("SELECT * FROM {$g5['member_table']} WHERE mb_id = '{$mb_id}'");
    if (!$member) return null;

    $tree = [
        'title' => $member['mb_id'],
        'name' => $member['mb_name'],
        'mb_datetime' => substr($member['mb_datetime'],0,10),
        'mb_recommend' => $member['mb_recommend'],
        'children' => []
    ];

    if ($member['left_user_id']) {
        $tree['children'][] = get_tree($member['left_user_id']);
    }
    if ($member['right_user_id']) {
        $tree['children'][] = get_tree($member['right_user_id']);
    }

    return $tree;
}

function getOrgMember()
{
    $root_id = $_GET['mb_id'];
    $tree_data = get_tree($root_id);

    header('Content-Type: application/json');
    echo json_encode($tree_data);

}