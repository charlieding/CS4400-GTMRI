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

$Name = $_POST['postPackageName'];
$Details = $_POST['postDetails'];
$Price = $_POST['postPrice'];
$PackageId = $_POST['postId'];

$userId = $_SESSION['userId'];
$sql = "Update package Set PackageName='$Name', Details='$Details', Price='$Price' Where PackageId='$PackageId'";
$resultSQL = mysqli_query($link, $sql);

mysqli_close($link);

?>
