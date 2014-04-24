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
$patientFirstName = $_GET['postPatientFirstName'];
$patientLastName = $_GET['postPatientLastName'];

$queryString = "SELECT FirstName, LastName, HomePhone, PatientUserName FROM Patient WHERE LastName LIKE '%$patientLastName%' AND FirstName LIKE '%$patientFirstName%'";
$result = mysqli_query($link,$queryString);

$ret = array();
while($patient = mysqli_fetch_assoc($result)){
	$ret[] = $patient;
}

echo json_encode($ret);
mysqli_close($link);
?>