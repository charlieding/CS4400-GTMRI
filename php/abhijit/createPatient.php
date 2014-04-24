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
$fname = $_POST['postfname'];
$lname = $_POST['postlname'];
$dob = $_POST['postdob'];
$gender = $_POST['postgender'];
$address = $_POST['postaddress'];
$homephone = $_POST['posthomephone'];
$workphone = $_POST['postworkphone'];
$emergency_name = $_POST['postemergency_name'];
$emergency_phone = $_POST['postemergency_phone'];
$weight = $_POST['postweight'];
$height = $_POST['postheight'];
$income = $_POST['postincome'];
$allergies = mysqli_escape_string($link,$_POST['postallergies']);
/* Form validations */

//this if statement is too long on its own
//splitting it into two for easier reading
if(!$fname || !$lname || !$dob || !$gender || !$address || !$homephone || !$weight){
	die("Please fill all the fields1");
}
if(!$income || !$allergies || !$emergency_name || !$emergency_phone){
	die("Please fill all the fields2");
}

if(!is_numeric($weight)){
	die("Please enter a number for weight");
}
if(!is_numeric($height)){
	die("Please enter a number for the height");
}
if(!is_numeric($income)){
	die("Please enter a number for income");
}

/* Insert patient info */
$queryString = "INSERT INTO Patient(FirstName, LastName, HomePhone, AnnualIncome,
	DOB, Gender, Address, WorkPhone, 
	EmergencyContactName, EmergencyContactPhone, 
	Weight, Height, PatientUsername) VALUES('$fname','$lname','$homephone',$income,'$dob','$gender','$address',
	'$workphone','$emergency_name','$emergency_phone',$weight,$height,'$username')";

$insertResult = mysqli_query($link,$queryString);

/* Insert patient allergies */
$allergies = explode(",", $allergies);
foreach ($allergies as $allergy) {
	$queryString = "INSERT INTO Patient_Allergies(PatientUsername,Allergy) VALUES('$username','$allergy')";
	$insertResult = mysqli_query($link,$queryString);
}

echo "success";

mysqli_close($link);
?>