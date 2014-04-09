 <?php 
 
echo "working";
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


 
 $target = "../ClubDashboard/images/"; 
 $target = $target . basename( $_FILES['photo']['name']); 
  
 
 $pic=($_FILES['photo']['name']); 
 
  
 
 
 mysql_query("INSERT INTO `Organization` VALUES ('$pic')") ; 
 
 
 if(move_uploaded_file($_FILES['photo']['tmp_name'], $target)) 
 { 
 
 	echo "The file ". basename( $_FILES['uploadedfile']['name']). " has been uploaded"; 
 } else { 
 
	 echo "error uploading"; 
 } 

 
 ?> 