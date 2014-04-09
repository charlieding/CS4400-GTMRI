<?php
require('../PasswordHash.php');
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

$uniqueCompanyId = $_SESSION['uniqueCompanyId'];
//-------------------------------------------------connect database

$costValue = $_POST['costValue'];
$finalCostValue = trim($costValue,"$ "); 

$packageName = $_POST['packageName'];
$finalPackageName = ltrim($packageName);

$packageDetails = $_POST['packageDetails'];

echo $finalCostValue. "<br>";
echo $finalPackageName. "<br>";
echo $packageDetails. "<br>";
echo $uniqueCompanyId;
$updatePackage = mysqli_query($link, "UPDATE package SET CompanyId = '$uniqueCompanyId' WHERE PackageName = '$finalPackageName' AND Details = '$packageDetails' AND Price='$finalCostValue'");

mysqli_close($link);
$result = array();
echo json_encode(array("result" => $result));
?>