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
$cardNum = $_POST['postCardNumber'];
$existingCard = $_POST['postExistingCard'];

$cardholderFirstName = '';
if(isset($_POST['postCardholderFirstName']))
	$cardholderFirstName = $_POST['postCardholderFirstName'];

$cardholderLastName ='';
if(isset($_POST['postCardholderLastName']))
	$cardholderLastName = $_POST['postCardholderLastName'];

$cardType = '';
if(isset($_POST['postCardType']))
	$cardType = $_POST['postCardType'];

$cardCvv = '';
if(isset($_POST['postCvvCode']))
	$cardCvv = $_POST['postCvvCode'];

$expireDate = '';
if(isset($_POST['postExpireDate']))
	$expireDate = $_POST['postExpireDate'];

if($existingCard == "false"){
	$insertCardQuery = "INSERT INTO Payment_Information(CardNumber,FirstName,LastName,Type,DateOfExpiry,CVV) VALUES(".
			"'$cardNum','$cardholderFirstName','$cardholderLastName','$cardType','$expireDate',$cardCvv)";
	$updatePatientCardInfoQuery = "UPDATE Patient SET CardNumber='$cardNum' WHERE PatientUsername='$username'";
	mysqli_query($link,$insertCardQuery);
	mysqli_query($link,$updatePatientCardInfoQuery);
}
foreach ($_SESSION['basket'] as $medicine => $details) {
	$dosage = $details['dosage'];
	$duration = $details['duration'];
	$doctorUsername = $details['doctorUsername'];
	$visitDate = $details['visitDate'];
	$queryString = "UPDATE Prescription SET Ordered=1 WHERE ".
		"MedicineName='$medicine' AND ".
		"Dosage=$dosage AND ".
		"Duration=$duration AND ".
		"DateOfVisit='$visitDate' AND ".
		"PatientUsername='$username'";
	mysqli_query($link,$queryString);
	echo mysqli_error($link);
	unset($_SESSION['basket'][$medicine]);
}
echo "success";
mysqli_close($link);
?>