<?php
include_once('./config.php');

// 미션 목록 조회
function get_missions() {
    global $g5, $member;
    check_login();

    $missions = sql_query("SELECT m.*, 
                                 mp.status as participation_status,
                                 mp.reward_claimed
                          FROM {$g5['missions']} m
                          LEFT JOIN {$g5['mission_participation']} mp 
                              ON m.mission_id = mp.mission_id 
                              AND mp.mb_id = '{$member['mb_id']}'
                          WHERE m.status = 'active'
                          AND m.start_date <= NOW()
                          AND m.end_date >= NOW()
                          ORDER BY m.start_date DESC");

    $data = [];
    while ($row = sql_fetch_array($missions)) {
        $data[] = [
            'mission_id' => $row['mission_id'],
            'title' => $row['title'],
            'description' => $row['description'],
            'reward_amount' => $row['reward_amount'],
            'end_date' => $row['end_date'],
            'status' => $row['participation_status'] ?: 'not_started',
            'reward_claimed' => $row['reward_claimed'] ? true : false
        ];
    }

    success_response($data);
}

// 미션 참여
function participate_mission() {
    global $g5, $member;
    check_login();

    $mission_id = isset($_POST['mission_id']) ? (int)$_POST['mission_id'] : 0;

    // 미션 존재 확인
    $mission = sql_fetch("SELECT * FROM {$g5['missions']} 
                         WHERE mission_id = {$mission_id}
                         AND status = 'active'
                         AND start_date <= NOW()
                         AND end_date >= NOW()");

    if (!$mission) {
        error_response('유효하지 않은 미션입니다.');
    }

    // 이미 참여 중인지 확인
    $exists = sql_fetch("SELECT * FROM {$g5['mission_participation']} 
                        WHERE mission_id = {$mission_id}
                        AND mb_id = '{$member['mb_id']}'");

    if ($exists) {
        error_response('이미 참여 중인 미션입니다.');
    }

    // 참여 처리
    sql_query("INSERT INTO {$g5['mission_participation']} 
              SET mission_id = {$mission_id},
                  mb_id = '{$member['mb_id']}',
                  status = 'in_progress',
                  created_at = NOW()");

    success_response(['message' => '미션 참여가 시작되었습니다.']);
}

// API 요청 처리
$action = isset($_POST['action']) ? $_POST['action'] : '';

switch ($action) {
    case 'get_list':
        get_missions();
        break;
    case 'participate':
        participate_mission();
        break;
    default:
        error_response('잘못된 요청입니다.');
}
