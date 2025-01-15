<?php
include_once('../../common.php');
include_once('../auth/check_auth.php');
header('Content-Type: application/json');

// 세션 인증 확인
$user = check_auth();

// 추천인 정보 조회
$query = "SELECT mb_recommend, mb_id FROM {$g5['member_table']} WHERE mb_id = '{$user['username']}'";
$result = mysqli_query($g5['connect_db'], $query);
$row = mysqli_fetch_assoc($result);

// 추천받은 회원 수 조회
$referral_query = "SELECT COUNT(*) as referral_count FROM {$g5['member_table']} WHERE mb_recommend = '{$user['username']}'";
$referral_result = mysqli_query($g5['connect_db'], $referral_query);
$referral_row = mysqli_fetch_assoc($referral_result);

echo json_encode([
    'success' => true,
    'data' => [
        'my_referral_code' => $user['username'],  // 나의 추천코드 (내 아이디)
        'recommended_by' => $row['mb_recommend'] ?: null,  // 나를 추천한 사람
        'referral_count' => intval($referral_row['referral_count']),  // 내가 추천한 사람 수
    ]
]);
