<?php
define('G5_CONTENTS', true);
include_once('../../_common.php');

// 클라이언트 설정
$client_id = '424653529603-p92ptgcsl4hhh3mq6obu09evt7dcp2kq.apps.googleusercontent.com';
$client_secret = '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';
$redirect_uri = 'https://' . $_SERVER['HTTP_HOST'] . '/api/auth/google_signin.php';

// 응답 형식 설정
header('Content-Type: application/json');

// POST 데이터 받기
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// 인증 코드 확인
if (!isset($data['code'])) {
    http_response_code(400);
    echo json_encode([
        'error' => 'missing_code',
        'error_description' => 'Authorization code is required'
    ]);
    exit();
}

$code = $data['code'];

// Google OAuth 토큰 엔드포인트로 요청
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://oauth2.googleapis.com/token');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
    'client_id' => $client_id,
    'client_secret' => $client_secret,
    'code' => $code,
    'grant_type' => 'authorization_code',
    'redirect_uri' => $redirect_uri
]));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_INTERFACE, '172.30.1.42');
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
curl_setopt($ch, CURLOPT_TIMEOUT, 15);

// DNS 설정
curl_setopt($ch, CURLOPT_DNS_SERVERS, '8.8.8.8,8.8.4.4');
curl_setopt($ch, CURLOPT_DNS_USE_GLOBAL_CACHE, false);
curl_setopt($ch, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$token_data = json_decode($response, true);

if ($http_code !== 200 || !$token_data) {
    http_response_code(401);
    echo json_encode([
        'error' => 'invalid_grant',
        'error_description' => $token_data['error_description'] ?? $token_data['error'] ?? 'Failed to get access token'
    ]);
    exit();
}

curl_close($ch);

// 사용자 정보 가져오기
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://www.googleapis.com/oauth2/v3/userinfo');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token_data['access_token']
]);

// SSL 및 연결 설정
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_INTERFACE, '172.30.1.42');
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
curl_setopt($ch, CURLOPT_TIMEOUT, 15);

// DNS 설정
curl_setopt($ch, CURLOPT_DNS_SERVERS, '8.8.8.8,8.8.4.4');
curl_setopt($ch, CURLOPT_DNS_USE_GLOBAL_CACHE, false);
curl_setopt($ch, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$user_info = json_decode($response, true);

curl_close($ch);

if ($http_code !== 200 || !$user_info) {
    http_response_code(401);
    echo json_encode([
        'error' => 'user_info_failed',
        'error_description' => 'Failed to get user information'
    ]);
    exit();
}

// Supabase 인증
$supabase_project_id = 'cmxeczvjzibtwvdagvmx';
$supabase_host = $supabase_project_id . '.supabase.co';
$auth_url = 'https://' . $supabase_host . '/auth/v1/token?grant_type=password';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $auth_url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'email' => $user_info['email'],
    'password' => hash('sha256', $user_info['sub']), // Google ID를 비밀번호로 사용
    'data' => [
        'name' => $user_info['name'],
        'avatar_url' => $user_info['picture'],
        'provider' => 'google',
        'provider_id' => $user_info['sub']
    ]
]));

// 헤더 설정
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNteGVjenZqemlidHd2ZGFndm14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3ODc2OTYsImV4cCI6MjA1MTM2MzY5Nn0.PuA4SJ5lMKnPCUXk9v_fJTgJPy0vZ947oryp1lHln98',
    'Content-Type: application/json',
    'Accept: application/json'
]);

// SSL 및 연결 설정
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_INTERFACE, '172.30.1.42');
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
curl_setopt($ch, CURLOPT_TIMEOUT, 15);

// DNS 설정
curl_setopt($ch, CURLOPT_DNS_SERVERS, '8.8.8.8,8.8.4.4');
curl_setopt($ch, CURLOPT_DNS_USE_GLOBAL_CACHE, false);
curl_setopt($ch, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$auth_data = json_decode($response, true);

curl_close($ch);

// 응답 반환
http_response_code($http_code);
echo json_encode([
    'token_type' => 'bearer',
    'access_token' => $token_data['access_token'],
    'expires_in' => $token_data['expires_in'],
    'refresh_token' => $token_data['refresh_token'],
    'user' => $user_info,
    'supabase' => $auth_data
]);
