<?php
include_once('../../common.php');
header('Content-Type: application/json');

// 데이터베이스에서 모든 회원 조회
$query = "SELECT mb_id, mb_name FROM {$g5['member_table']} LIMIT 5";
$result = mysqli_query($g5['connect_db'], $query);

$members = [];
while ($row = mysqli_fetch_assoc($result)) {
    $members[] = $row;
}

echo json_encode([
    'success' => true,
    'data' => [
        'members' => $members,
        'table' => $g5['member_table']
    ]
]);
