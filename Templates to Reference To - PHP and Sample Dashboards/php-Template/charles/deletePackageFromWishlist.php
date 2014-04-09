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

//echo $finalCostValue. "<br>";
//echo $finalPackageName. "<br>";
//echo $packageDetails. "<br>";
//echo $uniqueCompanyId;
$packageQuery = mysqli_query($link, "SELECT PackageId FROM Package WHERE PackageName = '$finalPackageName' AND Details = '$packageDetails' AND Price='$finalCostValue'");

$packageId = mysqli_fetch_array($packageQuery, MYSQL_ASSOC)["PackageId"];

echo $packageId;

$addToWishlist = mysqli_query($link, "DELETE FROM Wishlist WHERE CompanyId='$uniqueCompanyId' AND PackageId='$packageId'");

mysqli_close($link);
?>