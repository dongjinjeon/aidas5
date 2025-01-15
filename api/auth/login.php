<?php
include_once('../../common.php');
header('Content-Type: application/json');

// 요청 본문에서 JSON 데이터 읽기
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!isset($data['username']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => '계정과 암호를 입력해주세요.'
    ]);
    exit;
}

$username = $data['username'];
$password = $data['password'];

// SQL Injection 방지
$username = mysqli_real_escape_string($g5['connect_db'], $username);

// 사용자 조회
$query = "SELECT * FROM {$g5['member_table']} WHERE mb_id = '$username'";
$result = mysqli_query($g5['connect_db'], $query);

if ($result && mysqli_num_rows($result) > 0) {
    $user = mysqli_fetch_assoc($result);
    
    // 그누보드 비밀번호 검증
    $is_valid = (run_replace('check_password_auth', check_password($password, $user['mb_password']), $user));

    if ($is_valid) {
        // 세션에 사용자 정보 저장
        set_session('user', [
            'username' => $user['mb_id'],
            'name' => $user['mb_name'],
            'logged_in' => true
        ]);

        echo json_encode([
            'success' => true,
            'data' => [
                'username' => $user['mb_id'],
                'name' => $user['mb_name'],
                'token' => session_id()
            ]
        ]);
    } else {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => '잘못된 암호입니다.'
        ]);
    }
} else {
    http_response_code(401);
    echo json_encode([
        'success' => false,
        'message' => '존재하지 않는 계정입니다.'
    ]);
}
