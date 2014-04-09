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
$userEmail = $_SESSION['email'];

$sql = "SELECT * FROM company WHERE UserId=$userId;";
$resultSQL = mysqli_query($link, $sql);

$result = array();	
while ($row = mysqli_fetch_array($resultSQL, MYSQL_ASSOC)) {
	$_SESSION['companyId'] = $row["CompanyId"];
	array_push($result, array('companyName' => $row["CompanyName"],
							  'emailAddress' => $userEmail,
							  'companyDescription' => $row["CompanyDescription"]));
}

echo json_encode(array("companyDetails" => $result));
?>