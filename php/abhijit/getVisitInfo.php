<?php
		session_start();
//---connect database---------------------
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
//-------------------------------------------------connect database
$username = $_SESSION['username'];
$doctor = $_GET['getdoctor'];
$date = $_GET['getdate'];

$queryString = "SELECT FirstName, LastName, DiastolicBP, SystolicBP, Visit.Date, MedicineName, Dosage, Duration, Notes FROM Visit ".
"LEFT JOIN Prescription ON (Prescription.PatientUsername = '$username' AND  Prescription.DateOfVisit = '$date' AND Visit.DoctorUsername = Prescription.DoctorUsername) ".
"LEFT JOIN Doctor ON (Doctor.DoctorUsername = Visit.DoctorUsername) ".
"WHERE (Visit.Date = '$date' AND Visit.PatientUsername = '$username')";

$diagnosisQuery = "SELECT Diagnosis FROM Diagnosis WHERE Date='$date' AND PatientUsername='$username' AND DoctorUsername='$doctor'";

$result = mysqli_query($link,$queryString);
echo mysqli_error($link);
$diagnosisResult = mysqli_query($link,$diagnosisQuery);

$medicines = array();
$visitInfo = array();
$diagnosis = array();

while($visit = mysqli_fetch_assoc($result)){
	$visitInfo['FirstName'] = $visit['FirstName'];
	$visitInfo['LastName'] = $visit['LastName'];
	$visitInfo['sysBP'] = $visit['SystolicBP'];
	$visitInfo['diaBP'] = $visit['DiastolicBP'];

	$medicines[$visit['MedicineName']] = array(
		'Dosage' => $visit['Dosage'],
		'Duration' => $visit['Duration'],
		'Notes' => $visit['Notes']);
}

while($diag = mysqli_fetch_assoc($diagnosisResult)){
	$diagnosis[] = $diag['Diagnosis'];
}
$ret = array();
$ret['visitInfo'] = $visitInfo;
$ret['medicines'] = $medicines;
$ret['diagnosis'] = $diagnosis;

echo json_encode($ret);
mysqli_close($link);
?>