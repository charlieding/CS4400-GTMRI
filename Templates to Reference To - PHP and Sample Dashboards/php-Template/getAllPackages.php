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

$sql = "SELECT * from package";
$resultSQL = mysqli_query($link, $sql);

$result = array();

while($row = mysqli_fetch_array($resultSQL, MYSQL_ASSOC)){
	array_push($result, array('Package Name' => $row["PackageName"],
							  'Detail'=> $row["Details"],
							  'Price' => $row["Price"]));
                              }
echo json_encode(array("result" => $result));

?>