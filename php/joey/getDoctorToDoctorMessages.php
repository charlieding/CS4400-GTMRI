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
$queryString = "SELECT Doctor.DoctorUsername, Status, Content,  DateTime, FirstName, LastName
	FROM DoctorToDoctorComm
	JOIN (Doctor) ON (DoctorToDoctorComm.SenderUsername = Doctor.DoctorUsername)
	WHERE DoctorToDoctorComm.RecipientUsername = '$username'";
$result = mysqli_query($link,$queryString);

$ret = array();
while($message = mysqli_fetch_assoc($result)){
	$ret[] = $message;
}
echo json_encode($ret);
?>
