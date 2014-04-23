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

$queryString = "SELECT MedicineName FROM Prescription WHERE PatientUsername='$username' ".
			   "AND ORDERED != 1";
$results = mysqli_query($link,$queryString);

$ret = array();
while($name = mysqli_fetch_assoc($results)){
	if(!isset($_SESSION['basket'][$name['MedicineName']]))
		$ret[] = $name['MedicineName'];
}
echo json_encode($ret);
mysqli_close($link);
?>