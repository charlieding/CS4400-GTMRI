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

if (strpos($apptday, 'dd') !== false) {
	$yearmonthstartday = substr($apptday, 0, 7) . "-01";
	$yearmonthendday = substr($apptday, 0, 7) . "-31";
	$queryString = "SELECT FirstName, LastName, A.Date, StartTime, EndTime FROM Appointment as A, Patient as P WHERE A.Date >= '$yearmonthstartday' AND A.Date <= '$yearmonthendday' AND A.PatientUsername = P.PatientUsername AND A.DoctorUsername='$doctor' GROUP BY A.PatientUsername ORDER BY A.Date, StartTime";
} else {
	$queryString = "SELECT FirstName, LastName, StartTime, EndTime FROM Appointment as A, Patient as P WHERE A.Date='$apptday' AND A.PatientUsername = P.PatientUsername AND A.DoctorUsername='$doctor' GROUP BY A.PatientUsername ORDER BY StartTime";
}



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