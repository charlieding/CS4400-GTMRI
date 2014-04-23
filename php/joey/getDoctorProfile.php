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

$username = $_SESSION['username'];

$queryString = "SELECT LicenseNumber, FirstName, LastName, DOB, WorkPhone, Specialty, RoomNumber, HomeAddress  FROM Doctor where DoctorUsername = '$username'";
$availQuery = "SELECT Day, StartTime, EndTime FROM Doctor_Availability WHERE DoctorUsername = '$username'";

$searchResult = mysqli_query($link,$queryString);
$availResult = mysqli_query($link,$availQuery);


$ret = array();
$avail = array();
$ret['profile'] = mysqli_fetch_assoc($searchResult);

while($result = mysqli_fetch_assoc($availResult)){
		$avail['day'] = $result['Day'];
		$avail['start'] = $result['StartTime'];
		$avail['end'] = $result['EndTime'];
	}

$ret['avail'] = $avail;

echo json_encode($ret);
?>