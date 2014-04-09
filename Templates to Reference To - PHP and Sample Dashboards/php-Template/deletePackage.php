<?php

//-----start a session------------
session_start();

//-----connect database
$dbhost = "localhost";	
$dbuser = "root";
$dbpass = "";
$dbname = "unispon";
$link = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname); 

if(mysqli_connect_errno()){
	die("Database connection failed: " .
	mysqli_connect_error().
	 " (" . mysqli_connect_errno() . ")"
	 );
}

$PackageId = $_POST['id'];

$userId = $_SESSION['userId'];
$sql = "DELETE FROM package WHERE PackageId='$PackageId'";
$resultSQL = mysqli_query($link, $sql);

mysqli_close($link);

?>