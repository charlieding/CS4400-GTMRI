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
$dusername = $_SESSION['username'];
$pusername = $_POST['postpatientusername'];
$content = $_POST['postcontent'];




//set status to read
$sendMessage = "INSERT INTO DoctorToPatientComm (PatientUsername, DoctorUsername, Status, Content) 
VALUES ('$pusername', '$dusername', 'Unread', '$content')";

 
$messagesent = mysqli_query($link,$sendMessage);
echo('success');
?>
