<?php
include_once('./config.php');

// 일일 보상 클레임
function claim_daily_reward() {
    global $g5, $member;
    check_login();

    // 오늘 이미 받았는지 확인
    $today = date('Y-m-d');
    $exists = sql_fetch("SELECT * FROM {$g5['daily_rewards']} 
                        WHERE mb_id = '{$member['mb_id']}' 
                        AND claim_date = '{$today}'");

    if ($exists) {
        error_response('오늘 이미 보상을 받았습니다.');
    }

    // 랜덤 보상 포인트 (100~1000)
    $reward_points = rand(100, 1000);

    // 그누보드 포인트 시스템 사용
    include_once('../../common.php');
    include_once('../auth/check_auth.php');
    header('Content-Type: application/json');

    // 세션 인증 확인
    $user = check_auth();

    // 오늘 이미 보상을 받았는지 확인
    $today = date('Y-m-d');
    $query = "SELECT count(*) as cnt FROM {$g5['point_table']} 
              WHERE mb_id = '{$user['username']}' 
              AND po_content = '일일 보상' 
              AND DATE(po_datetime) = '$today'";
    $result = mysqli_query($g5['connect_db'], $query);
    $row = mysqli_fetch_assoc($result);

    if ($row['cnt'] > 0) {
        error_response('오늘 이미 보상을 받았습니다.');
    }

    // 포인트 지급
    insert_point($user['username'], $reward_points, '일일 보상', '@rewards', $user['username'], $user['username'].'-'.uniqid());

    success_response(['amount' => $reward_points]);
}

// 미션 보상 클레임
function claim_mission_reward() {
    global $g5, $member;
    check_login();

    $mission_id = isset($_POST['mission_id']) ? (int)$_POST['mission_id'] : 0;
    
    // 미션 참여 확인
    $participation = sql_fetch("SELECT * FROM {$g5['mission_participation']} 
                              WHERE mb_id = '{$member['mb_id']}' 
                              AND mission_id = {$mission_id}
                              AND status = 'completed'
                              AND reward_claimed = 0");

    if (!$participation) {
        error_response('클레임할 수 있는 보상이 없습니다.');
    }

    // 미션 정보 확인
    $mission = sql_fetch("SELECT * FROM {$g5['missions']} 
                         WHERE mission_id = {$mission_id}");

    sql_query("BEGIN");

    try {
        // 보상 지급 처리
        sql_query("UPDATE {$g5['crypto_wallet']} 
                  SET poten_balance = poten_balance + {$mission['reward_amount']}
                  WHERE mb_id = '{$member['mb_id']}'");

        // 보상 클레임 상태 업데이트
        sql_query("UPDATE {$g5['mission_participation']} 
                  SET reward_claimed = 1
                  WHERE participation_id = {$participation['participation_id']}");

        sql_query("COMMIT");
        success_response(['amount' => $mission['reward_amount']]);
    } catch (Exception $e) {
        sql_query("ROLLBACK");
        error_response('보상 지급 중 오류가 발생했습니다.');
    }
}

// API 요청 처리
$action = isset($_POST['action']) ? $_POST['action'] : '';

switch ($action) {
    case 'claim_daily':
        claim_daily_reward();
        break;
    case 'claim_mission':
        claim_mission_reward();
        break;
    default:
        error_response('잘못된 요청입니다.');
}
