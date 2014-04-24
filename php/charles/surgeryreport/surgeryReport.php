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
		$numOfDiscounts = 0;

		//Gets Number of Patients that have discounts	
		$getDiscountsSQL = "SELECT * FROM surgery_record WHERE CPT_Code = '$cptCode' AND SurgeryStartTime > (DATE_SUB(NOW(), INTERVAL 3 MONTH))";
		$discountResults = mysqli_query($link, $getDiscountsSQL);
		while($rowSearch2 = mysqli_fetch_array($discountResults, MYSQL_ASSOC)) {
			$patientUsername = $rowSearch2["PatientUsername"];
			//Checks for Discount ...
			$disSQL = "SELECT * FROM patient WHERE PatientUsername = '$patientUsername'";
			$disResult = mysqli_query($link, $disSQL);
			if($dis = mysqli_fetch_array($disResult, MYSQL_ASSOC)){
				if($dis["AnnualIncome"] < 25000){
					$numOfDiscounts = $numOfDiscounts+1;
				}
			}
		}

		//Gets Number of Procedures ... in the past 3 months...
		$getNumberOfProceduresSQL = "SELECT * FROM surgery_record WHERE CPT_Code = '$cptCode' AND SurgeryStartTime > (DATE_SUB(NOW(), INTERVAL 3 MONTH))";
		$numOfProcResult = mysqli_query($link, $getNumberOfProceduresSQL);
		$numOfProcedures = mysqli_num_rows($numOfProcResult);
		
		//Gets Number of Doctors ... in the past three months
		$getNumberOfDoctorsSQL = "SELECT DISTINCT DoctorUsername FROM surgery_record WHERE CPT_Code = '$cptCode' AND SurgeryStartTime > (DATE_SUB(NOW(), INTERVAL 3 MONTH))";
		$numOfDoctorsResult = mysqli_query($link, $getNumberOfDoctorsSQL);
		$numOfDoctors = mysqli_num_rows($numOfDoctorsResult);

		//Pushes Data onto Array
		array_push($resultSurgery, array('Surgery Type' => $rowSearch3["SurgeryType"],
									'CPT Code' => $rowSearch3["CPT_Code"],
									'NumProcedures' => $numOfProcedures,
									'NumDoctors' => $numOfDoctors,
									'NumOfDiscounts' => $numOfDiscounts,
									 'Price' => $rowSearch3["SurgeryCost"]));
	}

echo json_encode(array("resultlist" => $resultSurgery));



?>