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
if(!isset($_SESSION['basket'])){
	$_SESSION['basket'] = array();
}
$username = $_SESSION['username'];
$medName = $_POST['postMedicineName'];
$dosage = $_POST['postDosage'];
$duration = $_POST['postDuration'];
$doctorUsername = $_POST['postDoctorUsername'];
$visitDate = $_POST['postVisitDate'];

$queryString = "SELECT COUNT(*) >= 1 as Exist FROM Prescription WHERE PatientUsername='$username' AND ".
	" MedicineName='$medName' AND Dosage='$dosage' AND duration='$duration' AND ".
	" DoctorUsername='$doctorUsername' AND DateOfVisit='$visitDate'";
$result = mysqli_query($link,$queryString);
$result = mysqli_fetch_assoc($result);
if($result['Exist']){
	$_SESSION['basket'][$medName] = array(
			'medicineName' => $medName,
			'dosage' => $dosage,
			'duration' => $duration,
			'doctorUsername' => $doctorUsername,
			'visitDate' => $visitDate
		);
	echo "success";
}else {
	echo "You have entered incorrect info above, please check and try again";
	echo mysqli_error($link);
}
mysqli_close($link);
?>