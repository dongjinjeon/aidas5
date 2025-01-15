<?php
include_once('../../common.php');

// Web3 설정
define('WEB3_PROVIDER', 'https://bsc-dataseed.binance.org/');
define('POTEN_CONTRACT', '0x...'); // POTEN 토큰 컨트랙트 주소

// 보상 설정
define('DAILY_REWARD_AMOUNT', 500); // 일일 보상 PTC
define('REFERRAL_REWARD_AMOUNT', 1000); // 추천 보상 PTC
define('MISSION_BASE_REWARD', 400); // 미션 기본 보상 PTC

// 에러 응답 함수
function error_response($message) {
    echo json_encode(['success' => false, 'message' => $message]);
    exit;
}

// 성공 응답 함수
function success_response($data = []) {
    echo json_encode(['success' => true, 'data' => $data]);
    exit;
}

// 인증 체크 함수
function check_login() {
    global $member;
    if (!$member['mb_id']) {
        error_response('로그인이 필요합니다.');
    }
}
