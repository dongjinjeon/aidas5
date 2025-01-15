<?php
include_once('../../common.php');

function check_auth() {
    $user = get_session('user');
    
    if (!$user || !$user['logged_in']) {
        header('Content-Type: application/json');
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => '로그인이 필요합니다.'
        ]);
        exit;
    }
    
    return $user;
}
