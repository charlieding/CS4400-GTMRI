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
$result_organization = mysqli_query($link, "select * from organization where UserId = '$userId'");
$detailRow = mysqli_fetch_array($result_organization, MYSQL_ASSOC);
$organizationName = $detailRow["OrganizationName"];
echo $organizationName;
?>