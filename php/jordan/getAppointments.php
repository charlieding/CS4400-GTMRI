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
$doctor = $_SESSION['username'];
$apptday = $_POST['postapptday'];


$queryString = "SELECT FirstName, LastName, StartTime, EndTime FROM Appointment as A, Patient as P WHERE A.Date='$apptday' AND A.PatientUsername = P.PatientUsername AND A.DoctorUsername='$doctor' GROUP BY A.PatientUsername ORDER BY StartTime";




$searchResult = mysqli_query($link,$queryString);
echo mysqli_error($link);


$appointments = array();
if($searchResult){
	while($result = mysqli_fetch_assoc($searchResult)){
		$appointments[] = $result;
	}
}else {
	$appointments = 'none';
}
$ret['appointments'] = $appointments;
echo json_encode($ret);
?>