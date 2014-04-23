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
$patientfirstname = $_POST['postpatientfirstname'];
$patientlastname = $_POST['postpatientlastname'];
$patientphone = $_POST['postpatientphone'];

if (strlen($patientfirstname) > 0 && strlen($patientlastname) > 0 && strlen($patientphone) > 0) {
	$queryString = "SELECT FirstName, LastName, HomePhone, PatientUsername  FROM Patient as P " .
			   "WHERE P.FirstName='$patientfirstname' AND P.LastName='$patientlastname' ".
			   "AND P.HomePhone='$patientphone'";
} else if (strlen($patientfirstname) == 0) {
	$queryString = "SELECT FirstName, LastName, HomePhone, PatientUsername FROM Patient as P " .
			   "WHERE P.HomePhone='$patientphone'";
} else if (strlen($patientlastname) == 0 && strlen($patientphone) > 0) {
	$queryString = "SELECT FirstName, LastName, HomePhone, PatientUsername FROM Patient as P " .
			   "WHERE P.FirstName='$patientfirstname' AND P.HomePhone='$patientphone'";
} else if (strlen($patientphone) == 0 && strlen($patientlastname) > 0) {
	$queryString = "SELECT FirstName, LastName, HomePhone, PatientUsername FROM Patient as P " .
			   "WHERE P.FirstName='$patientfirstname' AND P.LastName='$patientlastname'";
} else if (strlen($patientlastname) == 0) {
	$queryString = "SELECT FirstName, LastName, HomePhone, PatientUsername FROM Patient as P " .
			   "WHERE P.FirstName='$patientfirstname'";
}



$searchResult = mysqli_query($link,$queryString);
echo mysqli_error($link);


$patients = array();
if($searchResult){
	while($result = mysqli_fetch_assoc($searchResult)){
		$patients[] = $result;
	}
}else {
	$patients = 'none';
}
$ret['patients'] = $patients;
echo json_encode($ret);
?>