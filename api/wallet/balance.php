<?php
include_once('../../common.php');
include_once('../auth/check_auth.php');
header('Content-Type: application/json');

// 세션 인증 확인
$user = check_auth();

// 지갑 잔액 조회
$query = "SELECT mb_point FROM {$g5['member_table']} WHERE mb_id = '{$user['username']}'";
$result = mysqli_query($g5['connect_db'], $query);

if ($result && mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $balance = intval($row['mb_point']);

    echo json_encode([
        'success' => true,
        'data' => [
            'balance' => $balance
        ]
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => '잔액 조회 실패'
    ]);
}
