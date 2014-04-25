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

	$getPatientUsernameSQL = "SELECT * FROM Patient WHERE FirstName = '$postFirstName' AND LastName = '$postLastName'";
	$patientUsernameResult = mysqli_query($link, $getPatientUsernameSQL);
	$patientUsername = "null";
	if($rowSearch = mysqli_fetch_array($patientUsernameResult, MYSQL_ASSOC)){
		$patientUsername = $rowSearch["PatientUsername"];
		$patientAnnualIncome = $rowSearch["AnnualIncome"];
	}

	$getSurgerySQL = "SELECT * FROM Surgery_Record WHERE PatientUsername = '$patientUsername'";
	$surgeryResults = mysqli_query($link, $getSurgerySQL);

	$resultSurgery = array(); 
	while($rowSearch3 = mysqli_fetch_array($surgeryResults, MYSQL_ASSOC)) {
		
		$cptCode = $rowSearch3["CPT_Code"];

		$getPriceSQL = "SELECT * FROM Surgery WHERE CPT_Code = '$cptCode'";
		$priceResult = mysqli_query($link, $getPriceSQL);
		if($rowSearch = mysqli_fetch_array($priceResult, MYSQL_ASSOC)){
			$finalPrice = $rowSearch["SurgeryCost"];
			if($patientAnnualIncome == NULL || (intval($patientAnnualIncome) < 25000)){
				$finalPrice = intval($finalPrice)/2;
			}
			array_push($resultSurgery, array('Surgery Type' => $rowSearch["SurgeryType"],
									 'Price' => $finalPrice));
		}
	}

echo json_encode(array("resultlist" => $resultSurgery));



?>