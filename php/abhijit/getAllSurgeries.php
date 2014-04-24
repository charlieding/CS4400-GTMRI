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


$queryString = "SELECT CPT_Code,SurgeryType FROM Surgery";
$result = mysqli_query($link,$queryString);

$ret = array();
while($surgery = mysqli_fetch_assoc($result)){
	$preOpMedQuery = "SELECT Preoperative_Medication FROM Surgery_PreopMed WHERE CPT_Code={$surgery['CPT_Code']}";
	$preOpResult = mysqli_query($link,$preOpMedQuery);
	$meds = mysqli_fetch_all($preOpResult,MYSQLI_ASSOC);
	$surgery['medicines'] = $meds;
	$ret[] = $surgery;
}
echo json_encode($ret);

mysqli_close($link);
?>