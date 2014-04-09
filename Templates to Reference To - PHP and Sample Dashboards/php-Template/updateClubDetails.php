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

$ClubName = $_POST['postClubName'];
$ClubMembers = $_POST['postClubMembers'];
$SchoolName = $_POST['postSchoolName'];
$ClubDetails = $_POST['postClubDetails'];
$EmailAddress = $_POST['postEmailAddress'];

$updateOrganization = mysqli_query($link, "Update organization Set OrganizationName='$ClubName', School='$SchoolName', OrganizationDescription='$ClubDetails', OrganizationSize='$ClubMembers' Where UserId=$UserId");
$updateUser = mysqli_query($link, "Update user Set email='$EmailAddress' Where UserId=$UserId");

mysqli_close($link);

$_SESSION['email'] = $EmailAddress;
?>