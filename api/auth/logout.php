<?php
include_once('../../common.php');
header('Content-Type: application/json');

// 세션 삭제
unset_session('user');

echo json_encode([
    'success' => true,
    'message' => '로그아웃되었습니다.'
]);
