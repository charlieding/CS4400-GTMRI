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


$postMonth = intval($_POST['postMonth']);
$postYear = intval($_POST['postYear']);

$beginDate = "";
$endDate = "";
if($postMonth == 12){
	$beginDate = ($postYear)."/12/"."01";
	$endDate = ($postYear+1)."/1/"."01";
}else{
	$beginDate = $postYear."/".$postMonth."/"."01";
	$endDate = $postYear."/".($postMonth+1)."/"."01";
}

	$getDoctorsSQL = "SELECT * FROM Doctor";
	$doctorsResults = mysqli_query($link, $getDoctorsSQL);

	$resultPatientVisitReport = array(); 
	while($rowSearch3 = mysqli_fetch_array($doctorsResults, MYSQL_ASSOC)) {
		
		$doctorUsername = $rowSearch3["DoctorUsername"];
		$doctorFirstName = $rowSearch3["FirstName"];
		$doctorLastName = $rowSearch3["LastName"];

		//Gets Number of Prescriptions Written
		$getNumberOfPrescriptionsSQL = "SELECT * FROM Prescription WHERE DoctorUsername = '$doctorUsername' AND DateOfVisit >= '$beginDate' AND DateOfVisit < '$endDate'";
		$numOfPresResult = mysqli_query($link, $getNumberOfPrescriptionsSQL);
		$numOfPrescriptions = mysqli_num_rows($numOfPresResult);
		
		//Gets Number of Patients Seen
		$getNumberOfDoctorsSQL = "SELECT DISTINCT PatientUsername FROM Visit WHERE DoctorUsername = '$doctorUsername' AND Date >= '$beginDate' AND Date < '$endDate'";
		$numOfDoctorsResult = mysqli_query($link, $getNumberOfDoctorsSQL);
		$numOfPatients = mysqli_num_rows($numOfDoctorsResult);

		//Gets Total Visits Billing
		$totalPrice = 0;
		$getVisitsSQL = "SELECT * FROM Visit WHERE DoctorUsername = '$doctorUsername'AND Date >= '$beginDate' AND Date < '$endDate'";
		$visitsResults = mysqli_query($link, $getVisitsSQL);
		while($rowSearch = mysqli_fetch_array($visitsResults, MYSQL_ASSOC)) {
			$totalPrice = $totalPrice + intval($rowSearch["BillingAmount"]);
		}
		//Pushes Data onto Array
		array_push($resultPatientVisitReport, array('FirstName' => $doctorFirstName,
									'LastName' => $doctorLastName,
									'NumPrescriptions' => $numOfPrescriptions,
									'NumPatients' => $numOfPatients,
									 'Price' => $totalPrice));
	}

echo json_encode(array("resultlist" => $resultPatientVisitReport));



?>