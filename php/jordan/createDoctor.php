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
$licnum = $_POST['postlicnum'];
$fname = $_POST['postfname']; 
$lname = $_POST['postlname'];
$dob = $_POST['postdob'];
$workphone = $_POST['postworkphone'];
$specialty = $_POST['postspecialty'];
$roomnum = $_POST['postroomnum'];
$address = $_POST['postaddress']; 
$availability = $_POST['postavailability']; 
$fromtime = $_POST['postfromtime']; 
$totime = $_POST['posttotime'];
/* Form validations */



//this if statement is too long on its own
//splitting it into two for easier reading

if($licnum == null){
	die("Please enter a license number.");
} else if ($fname === null || strlen($fname) == 0) {
	die("Please enter a first name.");
} else if ($lname === null || strlen($lname) == 0) {
	die("Please enter a last name.");
} else if ($dob === null || strlen($dob) == 0) {
	die("Please enter a date of birth.");
} else if ($workphone === null || strlen($workphone) == 0) {
	die("Please enter a work phone.");
} else if ($specialty == null || strlen($specialty) == 0) {
	die("Please select a specialty.");
} else if ($roomnum == null || strlen($roomnum) == 0 || !is_numeric($roomnum)) {
	die("Please enter an integer for room number.");
} else if ($address === null || strlen($address) == 0) {
	die("Please enter an address.");
} else if ($availability === null || count($availability) <= 0) {
	die("Please enter an availability date.");
} else if ($fromtime === null || count($fromtime) <= 0 || count($fromtime) != count($availability)) {
	die("Please enter a start time of availability.");
} else if ($totime === null || count($totime) <= 0 || count($totime) != count($availability)) {
	die("Please enter an end time of availability.");
} 


/* Insert doctor info */
$licenseExistResult = mysqli_query($link, "select * from Doctor where LicenseNumber = '$licnum'");

if(mysqli_num_rows($licenseExistResult) != 0){
			die("Doctor License Number Already Exists");
}

$queryString = "INSERT INTO Doctor(DoctorUsername, LicenseNumber, FirstName, 
	LastName, DOB, WorkPhone, Specialty, RoomNumber, HomeAddress) VALUES(";
$queryString = $queryString."'$username','$licnum','$fname','$lname','$dob','$workphone','$specialty',";
$queryString = $queryString."$roomnum,'$address')";

$insertResult = mysqli_query($link,$queryString);

for ($i=0; $i < count($availability); $i++) { 
	$queryString = "INSERT INTO Doctor_Availability(DoctorUsername, Day, StartTime, EndTime) VALUES('$username', '$availability[$i]', '$fromtime[$i]', '$totime[$i]')";
	$insertResult = mysqli_query($link,$queryString);
	echo mysqli_error($link);
}



echo "success";

$_SESSION['firstName'] = $fname;
$_SESSION['lastName'] = $lname;

mysqli_close($link);
?>