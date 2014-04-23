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
$doctorusername = $_SESSION['username'];
$patientusername = $_POST['postpatientusername'];

$queryString = "SELECT Date FROM Visit WHERE PatientUsername = '$patientusername' AND DoctorUsername = '$doctorusername'";

$result = mysqli_query($link,$queryString);

$ret = array();
while($visit = mysqli_fetch_assoc($result)){
	$ret[] = $visit;
}
echo json_encode($ret);
?>