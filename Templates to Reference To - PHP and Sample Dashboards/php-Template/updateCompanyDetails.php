<?php
require('PasswordHash.php');
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

$UserId = $_SESSION['userId'];
//-------------------------------------------------connect database

$EmailAddress = $_POST['postCompanyEmail'];
$CompanyName = $_POST['postCompanyName'];
$CompanyDescription = $_POST['postCompanyDescription'];

$_SESSION['email'] = $EmailAddress;


$updateOrganization = mysqli_query($link, "Update company Set CompanyName='$CompanyName', CompanyDescription='$CompanyDescription' Where UserId=$UserId");
$updateUser = mysqli_query($link, "Update user Set email='$EmailAddress' Where UserId=$UserId");

mysqli_close($link);

$_SESSION['email'] = $EmailAddress;
?>