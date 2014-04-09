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

$searchValue = $_POST['postsearch'];
$values = preg_split('/\s+/', trim($searchValue));
foreach ($values as $value) {
	$searchSQL = "SELECT * FROM Organization WHERE OrganizationName LIKE '%$value%'";
	$searchResultSQL = mysqli_query($link, $searchSQL);

	$searchSQL2 = "SELECT DISTINCT * FROM package WHERE PackageName LIKE '%$value%' OR Category LIKE '%$value%'";
	$searchResultSQL2 = mysqli_query($link, $searchSQL2);

	//combined with previous query to make more efficient and intuitive
	//$categorySearchSQL = "SELECT * FROM package WHERE Category LIKE '%$value%'";
	//$categorySearchResultSQL = mysqli_query($link, $categorySearchSQL);

	$result = array(); 

	//Combining code into on distinct sql query is much better than what this was before - Charles
	/*while($categorySearch = mysqli_fetch_array($categorySearchResultSQL, MYSQL_ASSOC)) {
		array_push($result, array('Package Name' => $categorySearch["PackageName"],
									 'Detail'=> $categorySearch["Details"],
									 'Price' => $categorySearch["Price"]));
	}*/

	while($rowSearch2 = mysqli_fetch_array($searchResultSQL2, MYSQL_ASSOC)) {
		array_push($result, array('Package Name' => $rowSearch2["PackageName"],
									 'Detail'=> $rowSearch2["Details"],
									 'Price' => $rowSearch2["Price"]));
	}
	while($rowSearch = mysqli_fetch_array($searchResultSQL, MYSQL_ASSOC)) {
		$orgId = $rowSearch["OrganizationId"];
		$sql = "SELECT * FROM package WHERE OrganizationId LIKE '$orgId'";
		$resultSQL = mysqli_query($link, $sql);
		while($row = mysqli_fetch_array($resultSQL, MYSQL_ASSOC)){
			array_push($result, array('Package Name' => $row["PackageName"],
									  'Detail'=> $row["Details"],
									  'Price' => $row["Price"]));
		}
	}
}
echo json_encode(array("result" => $result));



?>