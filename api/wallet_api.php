<?php
// 테스트용 응답
if (isset($_GET['test'])) {
    header('Content-Type: application/json; charset=UTF-8');
    header('Access-Control-Allow-Origin: *');
    echo json_encode([
        'success' => true,
        'message' => 'API is working',
        'time' => date('Y-m-d H:i:s'),
        'session_status' => session_status(),
        'session_id' => session_id(),
        'session_data' => $_SESSION,
        'server' => $_SERVER
    ]);
    exit;
}

include_once('../common.php');

// CORS 헤더 설정
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Origin: *'); // 개발 환경에서는 모든 도메인 허용
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
$log_dir = '../data/log';
if (!is_dir($log_dir)) {
    @mkdir($log_dir, 0777, true);
}

$log_file = @fopen("{$log_dir}/wallet_api.log", "a");
if ($log_file !== false) {
    fwrite($log_file, "\n=== " . date('Y-m-d H:i:s') . " ===\n");
    fwrite($log_file, "Request Method: " . $_SERVER['REQUEST_METHOD'] . "\n");
    fwrite($log_file, "POST Data: " . print_r($_POST, true) . "\n");
    fwrite($log_file, "Session Data: " . print_r($_SESSION, true) . "\n");
    fwrite($log_file, "Cookie Data: " . print_r($_COOKIE, true) . "\n");
}

if (!isset($_POST['action'])) {
    $error = 'Action is required';
    if ($log_file !== false) {
        fwrite($log_file, "Error: {$error}\n");
    }
    echo json_encode([
        'success' => false,
        'message' => $error
    ]);
    exit;
}

$action = $_POST['action'];
if ($log_file !== false) {
    fwrite($log_file, "Action: {$action}\n");
}

switch ($action) {
    case 'get_balance':
        // 세션 확인
        if (!isset($_SESSION['ss_mb_id']) || !$_SESSION['ss_mb_id']) {
            if ($log_file !== false) {
                fwrite($log_file, "Error: No session found\n");
                fwrite($log_file, "Session Data: " . print_r($_SESSION, true) . "\n");
                fwrite($log_file, "Cookie Data: " . print_r($_COOKIE, true) . "\n");
            }
            
            // 폰번호로 회원 찾기 시도
            if (isset($_POST['phone']) && $_POST['phone']) {
                $phone = $_POST['phone'];
                $sql = "SELECT * FROM {$g5['member_table']} WHERE mb_hp = '" . 
                       mysqli_real_escape_string($g5['connect_db'], $phone) . "'";
                $result = mysqli_query($g5['connect_db'], $sql);
                $member = mysqli_fetch_assoc($result);
                
                if ($member) {
                    $_SESSION['ss_mb_id'] = $member['mb_id'];
                    set_session('ss_mb_id', $member['mb_id']);
                    
                    if ($log_file !== false) {
                        fwrite($log_file, "Found member by phone: {$member['mb_id']}\n");
                    }
                } else {
                    if ($log_file !== false) {
                        fwrite($log_file, "No member found with phone: {$phone}\n");
                    }
                    echo json_encode([
                        'success' => false,
                        'message' => 'Member not found'
                    ]);
                    break;
                }
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'No session found'
                ]);
                break;
            }
        }

        $mb_id = $_SESSION['ss_mb_id'];
        if ($log_file !== false) {
            fwrite($log_file, "Member ID: {$mb_id}\n");
        }

        // 회원 포인트 조회 - g5_point 테이블에서 최신 포인트 가져오기
        $query = "SELECT p.po_mb_point as total_point 
                 FROM {$g5['point_table']} p
                 WHERE p.mb_id = '" . mysqli_real_escape_string($g5['connect_db'], $mb_id) . "'
                 ORDER BY p.po_datetime DESC 
                 LIMIT 1";
        
        if ($log_file !== false) {
            fwrite($log_file, "Query: {$query}\n");
        }
        
        $result = mysqli_query($g5['connect_db'], $query);
        
        if (!$result) {
            $error = mysqli_error($g5['connect_db']);
            if ($log_file !== false) {
                fwrite($log_file, "Query Error: {$error}\n");
            }
            echo json_encode([
                'success' => false,
                'message' => 'Database error'
            ]);
            break;
        }

        $point_data = mysqli_fetch_assoc($result);
        $total_points = $point_data ? (int)$point_data['total_point'] : 0;
            
        if ($log_file !== false) {
            fwrite($log_file, "Member points from g5_point: {$total_points}\n");
        }
            
        echo json_encode([
            'success' => true,
            'data' => [
                'bnb_balance' => '0',
                'aidas_balance' => $total_points,
                'token_fee' => '0'
            ]
        ]);
        break;

    default:
        $error = 'Invalid action';
        if ($log_file !== false) {
            fwrite($log_file, "Error: {$error}\n");
        }
        echo json_encode([
            'success' => false,
            'message' => $error
        ]);
        break;
}

if ($log_file !== false) {
    fwrite($log_file, "=== End of Request ===\n");
    fclose($log_file);
}
