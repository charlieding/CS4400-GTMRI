<?php

//-----start a session------------
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
$username = $_POST['postname'];
$password = $_POST['postpassword'];

if($username&&$password)
{
	
//---------check if user exist	
	if($result = mysqli_query($link, "select * from user where username = '$username'")){
		$row = mysqli_fetch_array($result, MYSQL_ASSOC);	
	}
	else{
		echo('user does not exist');
	}
//--------check if password is correct
require('PasswordHash.php');
// Base-2 logarithm of the iteration count used for password stretching
$hash_cost_log2 = 8;
// Do we require the hashes to be portable to older systems (less secure)?
$hash_portable = FALSE;
$hasher = new PasswordHash($hash_cost_log2, $hash_portable);
	if($hasher->CheckPassword($password, $row["Password"])){
		$userId = $row["UserId"];
        $userEmail = $row["Email"];
//--------check if userId belongs to company table or club table
		$result_organization = mysqli_query($link, "select * from organization where UserId = '$userId'");
		$_SESSION['userId'] = $userId;
        $_SESSION['email'] = $userEmail;
		//$detailRow = mysqli_fetch_array($detailResult, MYSQL_ASSOC);
		//$organizationName = $detailRow["OrganizationName"];
		if(mysqli_num_rows($result_organization) == 0){
			$searchSQLCompanyId = "SELECT * FROM Company WHERE UserId = '$userId'";
			$searchResultSQLCompanyId = mysqli_query($link, $searchSQLCompanyId);
			$rowSearchCompanyId = mysqli_fetch_array($searchResultSQLCompanyId, MYSQL_ASSOC);
			$_SESSION['uniqueCompanyId'] = $rowSearchCompanyId["CompanyId"];

			echo('company');
		}
		else{
			echo('organization');
		}
		//echo('true');
	}
	else{
		echo('sorry the password is wrong');
	}
	mysqli_free_result($result);
}
else
{
	echo('please type password or username');
}
mysqli_close($link)
?>