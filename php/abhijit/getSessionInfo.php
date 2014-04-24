<?php
session_start();

$fields = $_GET['field'];

$ret = array();
foreach ($fields as $field) {
	$ret[$field] = $_SESSION[$field];
}

echo json_encode($ret);
?>