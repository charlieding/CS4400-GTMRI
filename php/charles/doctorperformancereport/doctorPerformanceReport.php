<?php

//-----start a session------------
session_start();

//-----connect database
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

	$getSpecialtySQL = "SELECT DISTINCT Specialty FROM Doctor";
	$specialtyResults = mysqli_query($link, $getSpecialtySQL);

	$result = array(); 
	while($rowSearch3 = mysqli_fetch_array($specialtyResults, MYSQL_ASSOC)) {
		
		$specialtyType = $rowSearch3["Specialty"];
		
		//Gets Number of Surgeries Performed
		$totalNumOfSurgeries = 0;
		$totalNumOfRatings = 0;
		$totalValOfRatings = 0;
		$getDoctorsSQL = "SELECT DISTINCT DoctorUsername FROM Doctor WHERE Specialty = '$specialtyType' ";
		$doctorsResults = mysqli_query($link, $getDoctorsSQL);
		while($rowSearch2 = mysqli_fetch_array($doctorsResults, MYSQL_ASSOC)) {
			
			//Gets Rating of Each Doctor
			$doctorUsername = $rowSearch2["DoctorUsername"];
			$getRatesSQL = "SELECT * FROM Rates WHERE DoctorUsername = '$doctorUsername' ";
			$ratesResults = mysqli_query($link, $getRatesSQL);
			while($rowSearch0 = mysqli_fetch_array($ratesResults, MYSQL_ASSOC)) {
				$totalValOfRatings = $totalValOfRatings + intval($rowSearch0["Rating"]);
				$totalNumOfRatings = $totalNumOfRatings + 1;
			}

			//Gets Number of Surgereies
			$getNumberOfSurgeriesSQL = "SELECT * FROM Surgery_Record WHERE DoctorUsername = '$doctorUsername'";
			$numOfSurgResult = mysqli_query($link, $getNumberOfSurgeriesSQL);
			$numOfSurgeries = mysqli_num_rows($numOfSurgResult);
			$totalNumOfSurgeries = $totalNumOfSurgeries + intval($numOfSurgeries);
		}

		//Calculates Average Rating
		if($totalNumOfRatings == 0){
			$AverageRating = 0;
		}else{
			$AverageRating = $totalValOfRatings/$totalNumOfRatings;
		}

		//Pushes Data onto Array
		array_push($result, array('Surgery Type' => $specialtyType,
									'Average Rating' => $AverageRating,
									 'NumOfSurgeries' => $totalNumOfSurgeries));
	}

echo json_encode(array("resultlist" => $result));



?>