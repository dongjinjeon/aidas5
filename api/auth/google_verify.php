<?php
function verify_google_token($token) {
    // Google OAuth2 클라이언트 라이브러리 필요
    require_once('../../vendor/autoload.php');

    $client = new Google_Client(['client_id' => G5_GOOGLE_CLIENT_ID]);  // config.php에 정의 필요
    
    try {
        // ID 토큰 검증
        $payload = $client->verifyIdToken($token);
        
        if ($payload) {
            return [
                'email' => $payload['email'],
                'name' => $payload['name'],
                'picture' => $payload['picture']
            ];
        }
        
        return null;
    } catch (Exception $e) {
        return null;
    }
}
