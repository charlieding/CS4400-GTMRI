<?php

//-----start a session------------
session_start();

//-----connect database
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


$uniqueCompanyId = $_SESSION['uniqueCompanyId'];

	$searchSQL2 = "SELECT * FROM Package WHERE PackageId IN (
		SELECT PackageId 
		FROM Wishlist 
		WHERE CompanyId= $uniqueCompanyId)";
	$searchResultSQL2 = mysqli_query($link, $searchSQL2);

	$result = array(); 
	while($rowSearch2 = mysqli_fetch_array($searchResultSQL2, MYSQL_ASSOC)) {
		array_push($result, array('Package Name' => $rowSearch2["PackageName"],
									 'Detail'=> $rowSearch2["Details"],
									 'Price' => $rowSearch2["Price"]));
	}

echo json_encode(array("result" => $result));



?>