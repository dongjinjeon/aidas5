<?php
include_once('./_common.php');
include_once('./cors.php');

$json = json_decode(file_get_contents('php://input'), true);
$access_token = isset($json['access_token']) ? trim($json['access_token']) : '';

if (!$access_token) {
    echo json_encode([
        'success' => false,
        'message' => 'Access token is required'
    ]);
    exit;
}

// Supabase 사용자 정보 조회
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://cmxeczvjzibtwvdagvmx.supabase.co/auth/v1/user');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $access_token,
    'apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNteGVjenZqemlidHd2ZGFndm14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3ODc2OTYsImV4cCI6MjA1MTM2MzY5Nn0.PuA4SJ5lMKnPCUXk9v_fJTgJPy0vZ947oryp1lHln98'
]);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($http_code !== 200) {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid Supabase token'
    ]);
    exit;
}

$user_data = json_decode($response, true);
$email = $user_data['email'];

// 그누보드 회원 정보 조회
$member = sql_fetch(" select * from {$g5['member_table']} where mb_email = '$email' ");

echo json_encode([
    'success' => true,
    'data' => [
        'is_member' => !empty($member['mb_id']),
        'email' => $email,
        'provider' => $user_data['app_metadata']['provider']
    ]
]);
?>
