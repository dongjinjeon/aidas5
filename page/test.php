<?php

include_once('./_common.php');


$mb_id = 'pkb9086';

$member = sql_fetch("SELECT * FROM {$g5['member_table']} WHERE mb_id = '{$mb_id}'");
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
echo "select * from  {$g5['member_table']}  WHERE mb_id = '{$parent_id}'";

?>