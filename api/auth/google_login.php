<?php
define('G5_CONTENTS', true);
include_once('../../_common.php');

$client_id = '424653529603-p92ptgcsl4hhh3mq6obu09evt7dcp2kq.apps.googleusercontent.com';
$client_secret = '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';
$redirect_uri = 'https://' . $_SERVER['HTTP_HOST'] . '/api/auth/google_signin.php';

// 상태 토큰 생성
$state = bin2hex(random_bytes(16));
$_SESSION['oauth_state'] = $state;
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Google Login</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
        }
        .container {
            text-align: center;
            padding: 20px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .login-button {
            display: inline-block;
            background-color: #4285f4;
            color: white;
            padding: 10px 20px;
            border-radius: 4px;
            text-decoration: none;
            font-weight: bold;
            margin: 20px 0;
        }
        .login-button:hover {
            background-color: #357abd;
        }
        pre {
            text-align: left;
            white-space: pre-wrap;
            word-wrap: break-word;
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Google 로그인</h2>
        <p>개발 환경: <?php echo $_SERVER['HTTP_HOST']; ?></p>
        
        <?php
        // Google OAuth 2.0 인증 URL 생성
        $auth_url = 'https://accounts.google.com/o/oauth2/v2/auth';
        $params = array(
            'client_id' => $client_id,
            'redirect_uri' => $redirect_uri,
            'response_type' => 'code',
            'scope' => 'email profile',
            'state' => $state,
            'access_type' => 'offline',
            'prompt' => 'consent'
        );
        $auth_link = $auth_url . '?' . http_build_query($params);
        ?>
        
        <a href="<?php echo htmlspecialchars($auth_link); ?>" class="login-button">
            Google로 로그인
        </a>

        <div style="margin-top: 20px;">
            <h3>설정 안내</h3>
            <pre>
1. Google Cloud Console에서 다음 설정을 확인하세요:

클라이언트 ID:
<?php echo $client_id; ?>

승인된 리디렉션 URI:
<?php echo $redirect_uri; ?>

2. 현재 환경:
- 호스트: <?php echo $_SERVER['HTTP_HOST']; ?>
- 프로토콜: <?php echo $_SERVER['REQUEST_SCHEME'] ?? 'https'; ?>
- 전체 URL: <?php echo 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']; ?>
            </pre>
        </div>
    </div>
</body>
</html>
