<?php

//-----start a session------------
session_start();

//-----connect database
$_SESSION['dbhost'] = "localhost";
$_SESSION['dbuser'] = "root";
$_SESSION['dbpass'] = "";
$_SESSION['dbname'] = "cding9_gtmrs";

$dbhost = $_SESSION['dbhost'];	
$dbuser = $_SESSION['dbuser'];
$dbpass = $_SESSION['dbpass'];
$dbname = $_SESSION['dbname'];

$link = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname); 

if(mysqli_connect_errno()){
	die("Database connection failed: " .
	mysqli_connect_error().
	 " (" . mysqli_connect_errno() . ")"
	 );
}

$postFirstName = $_POST['postFirstName'];
$postLastName = $_POST['postLastName'];

	$phoneNumberSQL = "SELECT * FROM patient WHERE FirstName = '$postFirstName' AND LastName = '$postLastName'";
	$phoneNumberResults = mysqli_query($link, $phoneNumberSQL);

	$phoneNumber = "0000000000";
	if($rowSearch = mysqli_fetch_array($phoneNumberResults, MYSQL_ASSOC)){
		$phoneNumber = $rowSearch["HomePhone"]; 
	}
	echo $phoneNumber;
	/*
	while($rowSearch3 = mysqli_fetch_array($phoneNumberResults, MYSQL_ASSOC)) {
		array_push($resultSponsorshipList, array('Package Name' => $rowSearch3["PackageName"],
									 'Detail'=> $rowSearch3["Details"],
									 'Price' => $rowSearch3["Price"]));
	}*/

//echo json_encode(array("resultlist" => $resultSponsorshipList));



?>