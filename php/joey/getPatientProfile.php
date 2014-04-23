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

$queryString = "SELECT FirstName, LastName, HomePhone, AnnualIncome, DOB, Gender, Address, WorkPhone, Height, Weight,
				EmergencyContactName, EmergencyContactPhone  FROM Patient WHERE PatientUsername = '$username'";
				
$allergyQuery = "SELECT Allergy FROM Patient_Allergies WHERE PatientUsername = '$username'";

$searchResult = mysqli_query($link,$queryString) or die(mysql_error());
$allergyResult = mysqli_query($link,$allergyQuery) or die(mysql_error());

$profileInfo = array();
$allergies = array();
$ret = array();

$ret['profile'] = mysqli_fetch_assoc($searchResult);
while($row = mysqli_fetch_assoc($allergyResult)){
	$allergies[] = $row['Allergy'];
}

$ret['allergies'] = $allergies;

echo json_encode($ret);
?>