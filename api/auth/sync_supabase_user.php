<?php
include_once('./_common.php');
include_once('../cors.php');

// 요청 데이터 받기
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
$provider = $user_data['app_metadata']['provider'];
$provider_id = $user_data['app_metadata']['provider_id'];

// 그누보드 회원 정보 조회
$member = sql_fetch(" select * from {$g5['member_table']} where mb_email = '$email' ");

// 회원이 없는 경우 자동 가입
if (!$member['mb_id']) {
    $mb_id = get_email_username($email);
    $mb_nick = get_random_string(10);
    $mb_password = get_random_string(20);
    
    $sql = " insert into {$g5['member_table']}
                set mb_id = '$mb_id',
                    mb_password = '" . get_encrypt_string($mb_password) . "',
                    mb_name = '$mb_nick',
                    mb_nick = '$mb_nick',
                    mb_email = '$email',
                    mb_level = '2',
                    mb_status = '승인',
                    mb_datetime = '" . G5_TIME_YMDHIS . "',
                    mb_ip = '{$_SERVER['REMOTE_ADDR']}',
                    mb_email_certify = '" . G5_TIME_YMDHIS . "',
                    mb_mailling = '1',
                    mb_sms = '1',
                    mb_open = '1',
                    mb_certify = 'hp',
                    mb_login_ip = '{$_SERVER['REMOTE_ADDR']}',
                    mb_point = '0',
                    mb_today_login = '" . G5_TIME_YMDHIS . "',
                    mb_social_provider = '$provider',
                    mb_social_id = '$provider_id' ";
    sql_query($sql);

    // 회원가입 포인트 지급
    insert_point($mb_id, $config['cf_register_point'], '회원가입 축하', '@member', $mb_id, '회원가입');

    $member = sql_fetch(" select * from {$g5['member_table']} where mb_id = '$mb_id' ");
}

// 포인트 정보 조회
$sum_point = sql_fetch(" select sum(po_point) as point from {$g5['point_table']} where mb_id = '{$member['mb_id']}' ");
$total_point = (int)$sum_point['point'];

// 최근 포인트 내역
$point_list = [];
$result = sql_query(" select po_point, po_content, po_datetime from {$g5['point_table']} 
                     where mb_id = '{$member['mb_id']}' 
                     order by po_id desc limit 5 ");
while ($row = sql_fetch_array($result)) {
    $point_list[] = [
        'amount' => (int)$row['po_point'],
        'content' => $row['po_content'],
        'datetime' => $row['po_datetime']
    ];
}

// 소셜 로그인 정보 업데이트
if ($member['mb_social_provider'] != $provider || $member['mb_social_id'] != $provider_id) {
    sql_query(" update {$g5['member_table']} 
               set mb_social_provider = '$provider',
                   mb_social_id = '$provider_id',
                   mb_login_ip = '{$_SERVER['REMOTE_ADDR']}',
                   mb_today_login = '" . G5_TIME_YMDHIS . "'
               where mb_id = '{$member['mb_id']}' ");
}

// 응답 데이터
echo json_encode([
    'success' => true,
    'data' => [
        'mb_id' => $member['mb_id'],
        'mb_name' => $member['mb_name'],
        'mb_nick' => $member['mb_nick'],
        'mb_email' => $member['mb_email'],
        'mb_level' => (int)$member['mb_level'],
        'mb_point' => (int)$member['mb_point'],
        'total_point' => $total_point,
        'point_history' => $point_list,
        'provider' => $provider,
        'is_new_member' => !$member['mb_id']
    ]
]);

// 이메일 아이디 생성
function get_email_username($email) {
    $parts = explode('@', $email);
    $username = $parts[0];
    $username = preg_replace('/[^a-z0-9_]/i', '', $username);
    $username = substr($username, 0, 20);
    
    // 중복 체크
    $suffix = '';
    $i = 1;
    while (sql_fetch(" select mb_id from {$g5['member_table']} where mb_id = '{$username}{$suffix}' ")) {
        $suffix = $i++;
    }
    
    return $username . $suffix;
}

// 랜덤 문자열 생성
function get_random_string($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $string = '';
    for ($i = 0; $i < $length; $i++) {
        $string .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $string;
}
?>
