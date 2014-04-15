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
$patient = $_SESSION['username'];
$doctor = $_POST['postdoctor'];
$day = $_POST['postday'];
$start = $_POST['poststart'];
$end = $_POST['postend'];

$alreadyVisited = "SELECT COUNT(*) as appts FROM Appointment WHERE PatientUsername = '$patient' AND DoctorUsername='$doctor'";
$result = mysqli_query($link,$alreadyVisited);

$result = mysqli_fetch_assoc($result);

if($result['appts'] >= 1){
	die("cannot");
}

$apptRequest = "INSERT INTO Appointment (PatientUsername, DoctorUsername, Date, StartTime, EndTime)".
				"VALUES ('$patient', '$doctor', '$day', '$start', '$end')";
mysqli_query($link,$apptRequest);

$removeAvailability = "DELETE FROM Doctor_Availability WHERE DoctorUsername = '$doctor'".
					  "AND Day= '$day' AND StartTime= '$start' AND EndTime='$end'";
mysqli_query($link,$removeAvailability);

echo "requested";
?>
