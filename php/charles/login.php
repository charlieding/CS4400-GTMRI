<?php

//-----start a session------------
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

/*$dbhost = "localhost";	
$dbuser = "root";
$dbpass = "";
$dbname = "cding9_gtmrs";*/

$link = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname); 

if(mysqli_connect_errno()){
	die("Database connection failed: " .
	mysqli_connect_error().
	 " (" . mysqli_connect_errno() . ")"
	 );
}
//-------------------------------------------------connect database
$username = $_POST['postname'];
$password = $_POST['postpassword'];

if($username&&$password)
{
	
//---------check if user exist	
	$result = mysqli_query($link, "select * from User where Username = '$username'");
	if(mysqli_num_rows($result) != 0){
		$row = mysqli_fetch_array($result, MYSQL_ASSOC);	
		//--------check if password is correct
		require('PasswordHash.php');
		// Base-2 logarithm of the iteration count used for password stretching
		$hash_cost_log2 = 8;
		// Setting To Support Older Systems - FALSE == More Secure
		$hash_portable = FALSE;
		$hasher = new PasswordHash($hash_cost_log2, $hash_portable);
		if($hasher->CheckPassword($password, $row["Password"])){
			//--------check if $username belongs to admin, doctor, or patient table
			$result_doctor = mysqli_query($link, "select * from doctor where DoctorUsername = '$username'");
			$result_patient = mysqli_query($link, "select * from patient where PatientUsername = '$username'");
			$_SESSION['$username'] = $username;
			if(mysqli_num_rows($result_doctor) != 0){
				echo('doctor'); 
			}else if(mysqli_num_rows($result_patient) != 0){
				echo('patient');
			}
			else{
				echo('admin');
			}
		}
		else{
			echo('sorry the password is wrong');
		}
	}
	else{
		echo('user does not exist');
	}
	mysqli_free_result($result);
}
else
{
	echo('please type password or username');
}
mysqli_close($link)
?>