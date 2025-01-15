<?php
include_once('./_common.php');

$p = $_GET['p'];
$m=$_GET['m'];

include "{$p}.php";
$m();
?>