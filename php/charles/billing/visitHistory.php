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

	$getPatientUsernameSQL = "SELECT * FROM patient WHERE FirstName = '$postFirstName' AND LastName = '$postLastName'";
	$patientUsernameResult = mysqli_query($link, $getPatientUsernameSQL);
	$patientUsername = "null";
	if($rowSearch = mysqli_fetch_array($patientUsernameResult, MYSQL_ASSOC)){
		$patientUsername = $rowSearch["PatientUsername"];
	}

	$getVisitsSQL = "SELECT * FROM visit WHERE PatientUsername = '$patientUsername'";
	$visitsResults = mysqli_query($link, $getVisitsSQL);

	$resultVisits = array(); 
	while($rowSearch3 = mysqli_fetch_array($visitsResults, MYSQL_ASSOC)) {
		array_push($resultVisits, array('Visit Date' => $rowSearch3["Date"],
									 'Price' => $rowSearch3["BillingAmount"]));
	}

echo json_encode(array("resultlist" => $resultVisits));



?>