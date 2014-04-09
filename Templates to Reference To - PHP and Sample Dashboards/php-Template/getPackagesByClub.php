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
$sql = "select * from package where package.OrganizationId =
(select organization.OrganizationId from organization where UserId = '$userId')";
$resultSQL = mysqli_query($link, $sql);
$result = array();

while($row = mysqli_fetch_array($resultSQL, MYSQL_ASSOC))
	array_push($result, array('packageId' => $row["PackageId"],
							  'packageName' => $row["PackageName"],
							  'packagePrice' => $row["Price"],
							  'packageDetails' => $row["Details"]
	));
echo json_encode(array("packages" => $result));

?>
