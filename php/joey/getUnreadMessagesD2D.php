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




//set status to read
$sendMessage = "SELECT COUNT(*) AS count FROM DoctorToDoctorComm WHERE RecipientUsername = '$username' AND status = 'Unread'";

 
$result = mysqli_query($link,$sendMessage);
$ret = array();
$ret = mysqli_fetch_assoc($result);
echo($ret['count']);

?>
