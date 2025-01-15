<?php
include_once('../../common.php');
header('Content-Type: application/json');

// 요청 본문에서 JSON 데이터 읽기
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!isset($data['username']) || !isset($data['current_password']) || !isset($data['new_password'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => '필수 파라미터가 누락되었습니다.'
    ]);
    exit;
}

$username = mysqli_real_escape_string($g5['connect_db'], $data['username']);
$current_password = $data['current_password'];
$new_password = $data['new_password'];

// 사용자 조회
$query = "SELECT * FROM {$g5['member_table']} WHERE mb_id = '$username'";
$result = mysqli_query($g5['connect_db'], $query);

if ($result && mysqli_num_rows($result) > 0) {
    $user = mysqli_fetch_assoc($result);
    
    // 현재 비밀번호 확인
    $is_valid = (run_replace('check_password_auth', check_password($current_password, $user['mb_password']), $user));

    if ($is_valid) {
        // 새 비밀번호 암호화
        $new_password_hash = get_encrypt_string($new_password);
        
        // 비밀번호 업데이트
        $update_query = "UPDATE {$g5['member_table']} 
                        SET mb_password = '$new_password_hash'
                        WHERE mb_id = '$username'";
        
        if (mysqli_query($g5['connect_db'], $update_query)) {
            echo json_encode([
                'success' => true,
                'message' => '비밀번호가 변경되었습니다.'
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => '비밀번호 변경 실패'
            ]);
        }
    } else {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => '현재 비밀번호가 일치하지 않습니다.'
        ]);
    }
} else {
    http_response_code(404);
    echo json_encode([
        'success' => false,
        'message' => '사용자를 찾을 수 없습니다.'
    ]);
}
