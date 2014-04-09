<?php
require('PasswordHash.php');

	session_start();
//---connect database---------------------
$dbhost = "localhost";	
$dbuser = "root";
$dbpass = "";
$dbname = "unispon";
$link = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname); 

if(mysqli_connect_errno()){
	die("Database connection failed: " .
	mysqli_connect_error().
	 " (" . mysqli_connect_errno() . ")"
	 );
}
//-------------------------------------------------connect database

$newusername = $_POST['postname'];
$newOrganizationName = $_POST['postOrg'];
$newemail = $_POST['postemail'];
$newpassword = $_POST['postpassword1'];
$repeatpassword = $_POST['postpassword2'];
$newusertype = $_POST['postusertype'];
	if($newpassword !== $repeatpassword)
	{
		echo("The passwords you entered do not match");
	}
	elseif($newusername&&$newpassword&&$newemail)
	{
		//encrypt password
		$pwdHasher = new PasswordHash(8, FALSE);

		// $hash is what you would store in your database
		$hash = $pwdHasher->HashPassword( $newpassword );
		
		//check the length of the input
		if(strlen($newusername)>25||strlen($newemail)>25)
		{
			echo("max limit for username/email are 24 characters");
		}
		else
		{
			//---------check if user exist	
			$insertQuery = mysqli_query($link, 
			"Insert into user (username, password, email, usertype) values ('$newusername','$hash','$newemail','$newusertype')");
			$lastInsertedId = $link->insert_id;
			$_SESSION['userId'] = $lastInsertedId;
			$_SESSION['email'] = $newemail;
			if($newusertype == "Company") {
				$insertCompanyQuery = mysqli_query($link,
				"Insert into company (UserId, CompanyName) values ($lastInsertedId, '$newOrganizationName')");
				echo("company");
			}
			else {
				$insertClubQuery = mysqli_query($link,
				"Insert into organization (UserId, OrganizationName, School) values ($lastInsertedId, '$newOrganizationName', 'Georgia Institute of Technology')");
				echo("organization");
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