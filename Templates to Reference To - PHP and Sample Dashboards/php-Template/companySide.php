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

$userId = $_SESSION['userId'];
$result_company = mysqli_query($link, "select * from company where UserId = '$userId'");
$detailRow = mysqli_fetch_array($result_company, MYSQL_ASSOC);
$companyName = $detailRow["CompanyName"];
echo $companyName;
?>