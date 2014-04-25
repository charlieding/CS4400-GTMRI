<?php
	session_start();
//---connect database---------------------
$_SESSION['dbhost'] = "localhost:3306";
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
//-------------------------------------------------connect database

$doctor = $_SESSION['username'];
$patient = $_SESSION['patient'];
// $patient = $_POST['postpatient'];
$visitdate = $_POST['postvisitdate'];
$systolicbp = $_POST['postsystolicbp']; 
$diastolicbp = $_POST['postdiastolicbp'];
$diagnosis = $_POST['postdiagnosis'];
$medname = $_POST['postmedname'];
$meddosage = $_POST['postmeddosage'];
$medduration = $_POST['postmedduration'];
$mednotes = $_POST['postmednotes'];

$visitExistResult = mysqli_query($link, "select * from Visit WHERE PatientUsername = '$patient' AND DoctorUsername ='$doctor' AND Date = '$visitdate'");

if(mysqli_num_rows($visitExistResult) != 0){
	echo("Visit already exists");
}

//Initial vist rate = 150.  If low income, take 20% off everything, second and subsequent visits = 75.  Perform query where visit matches patient username to see how many visits they have had. Patient belong to low-income if they earn less than 25,000 per year.

$patientIncome = mysqli_query($link, "SELECT AnnualIncome FROM Patient WHERE PatientUsername = '$patient'");
$patientIncome = mysqli_fetch_assoc($patientIncome);

$numVisits = mysqli_query($link, "SELECT Count(*) FROM Visit WHERE PatientUsername = '$patient'");
$numVisits = mysqli_fetch_assoc($numVisits);
echo mysqli_error($link);

$visitCost = 0;
if ($numVisits['Count(*)'] > 0) {
	$visitCost = 150;
} else {
	$visitCost = 200;
}
if ($patientIncome['AnnualIncome'] < 25000) {
	$visitCost -= ($visitCost * .2);
}

$checkString = "SELECT * FROM Appointment WHERE PatientUsername = '$patient' AND DoctorUsername = '$doctor' AND Date = '$visitdate'";

$apptCheckResult = mysqli_query($link,$checkString);

if(mysqli_num_rows($apptCheckResult) < 1){
	die("No appointment to record a visit for.");
} else {
	$queryString = "INSERT INTO Visit(PatientUsername, Date, DoctorUsername, 
	BillingAmount, DiastolicBP, SystolicBP) VALUES(";
	$queryString = $queryString."'$patient', '$visitdate', '$doctor', $visitCost, '$diastolicbp', '$systolicbp')";

	$insertResult = mysqli_query($link,$queryString);

	for ($i=0; $i < count($diagnosis); $i++) {  
		$queryString = "INSERT INTO Visit_Diagnosis(PatientUsername, Date, DoctorUsername, Diagnosis) VALUES('$patient', '$visitdate', '$doctor', '$diagnosis[$i]')";
		$insertResult = mysqli_query($link,$queryString);
		echo mysqli_error($link);
	}

	for ($i=0; $i < count($medname); $i++) {  
		$queryString = "INSERT INTO Prescription(MedicineName, DateOfVisit, DoctorUsername, PatientUsername, Notes, Dosage, Duration, Ordered) VALUES('$medname[$i]', '$visitdate', '$doctor', '$patient', '$mednotes[$i]', '$meddosage[$i]', '$medduration[$i]', 0)";
		$insertResult = mysqli_query($link,$queryString);
		echo mysqli_error($link);
	}

	$queryString = "DELETE FROM Appointment WHERE PatientUsername = '$patient' AND DoctorUsername = '$doctor' AND Date = '$visitdate'";
	$deleteResult = mysqli_query($link,$queryString);
		echo mysqli_error($link);

	echo "success";

}



mysqli_close($link);
?>