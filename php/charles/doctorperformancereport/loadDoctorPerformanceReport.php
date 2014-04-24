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


$uniqueCompanyId = $_SESSION['uniqueCompanyId'];

	$loadSponsorshipListSQL = "SELECT * FROM Package WHERE CompanyId = $uniqueCompanyId";
	$loadSponsorshipListResultSQL = mysqli_query($link, $loadSponsorshipListSQL);

	$resultSponsorshipList = array(); 
	while($rowSearch3 = mysqli_fetch_array($loadSponsorshipListResultSQL, MYSQL_ASSOC)) {
		array_push($resultSponsorshipList, array('Package Name' => $rowSearch3["PackageName"],
									 'Detail'=> $rowSearch3["Details"],
									 'Price' => $rowSearch3["Price"]));
	}

echo json_encode(array("resultlist" => $resultSponsorshipList));



?>