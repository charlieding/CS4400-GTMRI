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
$specialty = $_POST['postspeciality'];

$queryString = "SELECT FirstName, LastName, WorkPhone, RoomNumber, Day, StartTime, EndTime, Doctor.DoctorUsername ".
				"FROM Doctor, Doctor_Availability WHERE Specialty='$specialty' ".
				"AND Doctor.DoctorUsername = Doctor_Availability.DoctorUsername AND DAY > NOW() ORDER BY Doctor.DoctorUsername";
$ratingQuery = "SELECT DoctorUsername,AVG(Rating) FROM Rates WHERE Rates.DoctorUsername IN ".
			"(SELECT Doctor.DoctorUsername FROM Doctor WHERE Specialty='$specialty') GROUP BY DoctorUsername ".
			"ORDER BY Rates.DoctorUsername";
$searchResult = mysqli_query($link,$queryString);
$ratingResult = mysqli_query($link,$ratingQuery);
echo mysqli_error($link);


$ret = array();
$doctors = array();
if($searchResult){
	while($result = mysqli_fetch_assoc($searchResult)){
		$doctors[] = $result;
	}
}else {
	$doctors = 'none';
}
$ret['doctors'] = $doctors;
$ratings = array();
if($ratingResult){
	while($result = mysqli_fetch_assoc($ratingResult)){
		$ratings[$result['DoctorUsername']] = $result['AVG(Rating)'];
	}
}else {
	$ratings = 'none';
}

$ret['ratings'] = $ratings;
echo json_encode($ret);
?>