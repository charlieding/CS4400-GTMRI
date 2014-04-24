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
$doctorFirstName = $_SESSION['firstName'];
$doctorLastName = $_SESSION['lastName'];

$patientFirstName = $_POST['postPatientFirstName'];
$patientLastName = $_POST['postPatientLastName'];
$patientUsername = $_POST['postPatientUsername'];
$cptCode = $_POST['postCptCode'];
$numAssistants = $_POST['postNumAssistants'];
$anesthesiaStart = $_POST['postAnesthesiaStart'];
$surgeryStartDateTime = $_POST['postSurgeryStartDate']." ".$_POST['postSurgeryTimeStart'];
$surgeryEndTime = $_POST['postSurgeryEnd'];
$complications = $_POST['postComplications'];

$queryString = "INSERT INTO Surgery_Record(PatientUsername,DoctorUsername,SurgeryEndTime,SurgeryStartTime,".
				"Complications,AnesthesiaStartTime,NumOfAssistants,CPT_Code,SurgeonFirstName,".
				"SurgeonLastName,PatientFirstName,PatientLastName) ".
			   	"VALUES('$patientUsername','$username','$surgeryEndTime','$surgeryStartDateTime',".
			   	"'$complications','$anesthesiaStart',$numAssistants,$cptCode,'$doctorFirstName',".
			   	"'$doctorLastName','$patientFirstName','$patientLastName')";
echo $queryString;

mysqli_query($link,$queryString);
echo mysqli_error($link);

echo "success";

mysqli_close($link);
?>