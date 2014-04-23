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
$dusername = $_POST['postdoctorusername'];
$date = $_POST['postdate'];



//set status to read
$updateRead = "UPDATE DoctorToPatientComm SET Status = 'Read' WHERE PatientUsername = '$username' 
				AND DoctorUsername = '$dusername' AND DateTime = '$date'";
 
$updateReadRes = mysqli_query($link,$updateRead);

?>
