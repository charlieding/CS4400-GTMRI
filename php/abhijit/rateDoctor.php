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
$doctorUsername = $_POST['postDoctorUsername'];
$rating = $_POST['postRating'];

if(!$doctorUsername){
	die('Enter a doctor to rate!');
}

if(!$rating){
	die('Enter a rating!');
}

$checkQueryString = "SELECT * FROM Rates WHERE PatientUsername='$username' AND DoctorUsername='$doctorUsername'";
$result = mysqli_query($link,$checkQueryString);

$queryString = '';
if(mysqli_num_rows($result) != 0){
	$queryString = "UPDATE Rates SET Rating=$rating";
}else {
	$queryString = "INSERT INTO Rates(PatientUsername,DoctorUsername,Rating) ".
		"VALUES('$username','$doctorUsername','$rating')";
}
mysqli_query($link,$queryString);

echo mysqli_error($link);

echo "success";
?>