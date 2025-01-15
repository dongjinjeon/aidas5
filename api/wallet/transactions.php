<?php
include_once('../../common.php');
include_once('../auth/check_auth.php');
header('Content-Type: application/json');

// 세션 인증 확인
$user = check_auth();

// 페이지네이션 설정
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$items_per_page = 20;
$offset = ($page - 1) * $items_per_page;

// 전체 거래 내역 수 조회
$total_query = "SELECT COUNT(*) as cnt FROM {$g5['point_table']} WHERE mb_id = '{$user['username']}'";
$total_result = mysqli_query($g5['connect_db'], $total_query);
$total_row = mysqli_fetch_assoc($total_result);
$total_items = $total_row['cnt'];
$total_pages = ceil($total_items / $items_per_page);

// 거래 내역 조회
$query = "SELECT 
            po_id,
            po_datetime,
            po_content,
            po_point,
            po_rel_table,
            po_rel_id
          FROM {$g5['point_table']} 
          WHERE mb_id = '{$user['username']}'
          ORDER BY po_id DESC
          LIMIT $offset, $items_per_page";
$result = mysqli_query($g5['connect_db'], $query);

$transactions = [];
while ($row = mysqli_fetch_assoc($result)) {
    $transactions[] = [
        'id' => $row['po_id'],
        'datetime' => $row['po_datetime'],
        'description' => $row['po_content'],
        'amount' => intval($row['po_point']),
        'type' => $row['po_rel_table'],
        'reference' => $row['po_rel_id']
    ];
}

echo json_encode([
    'success' => true,
    'data' => [
        'transactions' => $transactions,
        'pagination' => [
            'current_page' => $page,
            'total_pages' => $total_pages,
            'items_per_page' => $items_per_page,
            'total_items' => $total_items
        ]
    ]
]);
