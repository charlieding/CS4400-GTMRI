<?php
require('PasswordHash.php');

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

$newusername = $_POST['postname'];
$newpassword = $_POST['postpassword1'];
$repeatpassword = $_POST['postpassword2'];
$newusertype = $_POST['postusertype'];
	if($newpassword !== $repeatpassword)
	{
		echo("The passwords you entered do not match");
	}
	elseif($newusername&&$newpassword)
	{
		//encrypt password
		$pwdHasher = new PasswordHash(8, FALSE);

		// $hash is what you would store in your database
		$hash = $pwdHasher->HashPassword( $newpassword );
		
		//check the length of the input
		$userExistResult = mysqli_query($link, "select * from User where Username = '$newusername'");
		if(strlen($newusername)>25)
		{
			echo("max limit for username is 24 characters");
		}

		//check if user exist	
		else if(mysqli_num_rows($userExistResult) != 0){
			echo("Username Already Exists");
		}

		else
		{
			//---------create new user
			$insertQuery = mysqli_query($link, 
			"Insert into User (Username, Password) values ('$newusername','$hash')");
			$_SESSION['username'] = $newusername;
			if($newusertype == "Doctor") {
				//TODO: GO TO "Create Doctor Profile"
				echo("doctor");
			}else if($newusertype == "Patient"){
				//TODO:  GO TO "Create Patient Profile"
				echo("patient");
			}else{ /*Admin*/
				echo("admin");
			}
			
		}
		//---connect database---------------------
	}
	else
	{
		echo("please fill all fields");
	}

mysqli_close($link)
?>