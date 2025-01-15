<?php
include_once('../../common.php');

// CORS 헤더 설정
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 3600');

// OPTIONS 요청 처리
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 세션 시작
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// 로그 파일 설정
$log_dir = '../../data/log';
if (!is_dir($log_dir)) {
    @mkdir($log_dir, 0777, true);
}

$log_file = @fopen("{$log_dir}/auth.log", "a");
if ($log_file !== false) {
    fwrite($log_file, "\n=== " . date('Y-m-d H:i:s') . " ===\n");
    fwrite($log_file, "Request Method: " . $_SERVER['REQUEST_METHOD'] . "\n");
    fwrite($log_file, "POST Data: " . print_r($_POST, true) . "\n");
    fwrite($log_file, "Session Data: " . print_r($_SESSION, true) . "\n");
}

if (!isset($_POST['action'])) {
    $response = array(
        'success' => false,
        'message' => 'Action is required'
    );
    echo json_encode($response);
    exit;
}

$action = $_POST['action'];

switch ($action) {
    case 'send_code':
        if (!isset($_POST['phone'])) {
            echo json_encode(['success' => false, 'message' => 'Phone number is required']);
            exit;
        }

        $phone = trim($_POST['phone']);
        
        // 테스트용 코드: 실제로는 SMS 발송 로직 구현 필요
        $_SESSION['verify_code'] = '1234';
        $_SESSION['verify_phone'] = $phone;
        
        if ($log_file !== false) {
            fwrite($log_file, "Generated verification code for {$phone}: 1234\n");
        }

        echo json_encode(['success' => true, 'message' => 'Verification code sent']);
        break;

    case 'verify_code':
        if (!isset($_POST['phone']) || !isset($_POST['code'])) {
            echo json_encode(['success' => false, 'message' => 'Phone and code are required']);
            exit;
        }

        $phone = trim($_POST['phone']);
        $code = trim($_POST['code']);

        if ($log_file !== false) {
            fwrite($log_file, "Verifying code for {$phone}: {$code}\n");
            fwrite($log_file, "Session code: {$_SESSION['verify_code']}\n");
        }

        // 인증번호 확인
        if (!isset($_SESSION['verify_code']) || !isset($_SESSION['verify_phone']) || 
            $_SESSION['verify_code'] !== $code || $_SESSION['verify_phone'] !== $phone) {
            echo json_encode(['success' => false, 'message' => 'Invalid verification code']);
            exit;
        }

        // 회원 정보 조회
        $sql = "SELECT * FROM {$g5['member_table']} WHERE mb_hp = '" . mysqli_real_escape_string($g5['connect_db'], $phone) . "'";
        $result = mysqli_query($g5['connect_db'], $sql);
        $member = mysqli_fetch_assoc($result);

        if ($member) {
            // 기존 회원인 경우
            set_session('ss_mb_id', $member['mb_id']);
            $_SESSION['ss_mb_id'] = $member['mb_id']; // 추가 세션 설정
            
            if ($log_file !== false) {
                fwrite($log_file, "Existing member logged in: {$member['mb_id']}\n");
            }
        } else {
            // 새로운 회원 생성
            $mb_id = substr(md5(uniqid(rand(), true)), 0, 10);
            $sql = "INSERT INTO {$g5['member_table']} 
                   SET mb_id = '" . mysqli_real_escape_string($g5['connect_db'], $mb_id) . "',
                       mb_hp = '" . mysqli_real_escape_string($g5['connect_db'], $phone) . "',
                       mb_name = '회원" . substr($phone, -4) . "',
                       mb_nick = '회원" . substr($phone, -4) . "',
                       mb_level = 2,
                       mb_status = 1,
                       mb_point = 0,
                       mb_datetime = '" . G5_TIME_YMDHIS . "',
                       mb_ip = '" . mysqli_real_escape_string($g5['connect_db'], $_SERVER['REMOTE_ADDR']) . "'";
            
            if ($log_file !== false) {
                fwrite($log_file, "Creating new member: {$mb_id}\n");
                fwrite($log_file, "SQL: {$sql}\n");
            }

            if (!mysqli_query($g5['connect_db'], $sql)) {
                if ($log_file !== false) {
                    fwrite($log_file, "Error creating member: " . mysqli_error($g5['connect_db']) . "\n");
                }
                echo json_encode(['success' => false, 'message' => 'Failed to create member']);
                exit;
            }

            // 세션 설정
            set_session('ss_mb_id', $mb_id);
            $_SESSION['ss_mb_id'] = $mb_id;
            
            // 추가 세션 설정
            set_session('ss_mb_reg', $mb_id);
            $_SESSION['ss_mb_reg'] = $mb_id;
        }

        // 세션 검증
        if ($log_file !== false) {
            fwrite($log_file, "Final Session Data: " . print_r($_SESSION, true) . "\n");
            fwrite($log_file, "Final Member ID: " . $_SESSION['ss_mb_id'] . "\n");
        }

        echo json_encode(['success' => true, 'message' => 'Verification successful']);
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Invalid action']);
        break;
}

if ($log_file !== false) {
    fwrite($log_file, "=== End of Request ===\n");
    fclose($log_file);
}
