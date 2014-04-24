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

	$getSurgerySQL = "SELECT * FROM surgery";
	$surgeryResults = mysqli_query($link, $getSurgerySQL);

	$resultSurgery = array(); 
	while($rowSearch3 = mysqli_fetch_array($surgeryResults, MYSQL_ASSOC)) {
		
		$cptCode = $rowSearch3["CPT_Code"];
		$surgeryType = $rowSearch3["SurgeryType"];
		$surgeryCost = $rowSearch3["SurgeryCost"];

		//Gets Number of Procedures
		$getNumberOfProceduresSQL = "SELECT * FROM surgery_record WHERE CPT_Code = '$cptCode'";
		$numOfProcResult = mysqli_query($link, $getNumberOfProceduresSQL);
		$numOfProcedures = mysqli_num_rows($numOfProcResult);
		
		//Gets Number of Doctors
		$getNumberOfDoctorsSQL = "SELECT DISTINCT DoctorUsername FROM surgery_record WHERE CPT_Code = '$cptCode'";
		$numOfDoctorsResult = mysqli_query($link, $getNumberOfDoctorsSQL);
		$numOfDoctors = mysqli_num_rows($numOfDoctorsResult);

		//Pushes Data onto Array
		array_push($resultSurgery, array('Surgery Type' => $rowSearch3["SurgeryType"],
									'CPT Code' => $rowSearch3["CPT_Code"],
									'NumProcedures' => $numOfProcedures,
									'NumDoctors' => $numOfDoctors,
									 'Price' => $rowSearch3["SurgeryCost"]));
	}

echo json_encode(array("resultlist" => $resultSurgery));



?>