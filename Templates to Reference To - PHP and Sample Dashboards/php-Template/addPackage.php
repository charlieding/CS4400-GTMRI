<?php
//-----start a session------------
session_start();
//---connect database---------------------
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

//-------------------------------------------------connect database
$organizationId = $_SESSION['organizationId'];
$packageName = $_POST['postPackageName'];
$price = $_POST['postPrice'];
$details = $_POST['postDetails'];
$sql = "Insert into Package (PackageName, OrganizationId, CompanyId, Details, Price) values ('$packageName', $organizationId, null,'$details',$price)";
$resultSQL = mysqli_query($link, $sql);
echo "successful";
?>