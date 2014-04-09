<?php
$submit = $_POST['submit'];
if($submit)
{
	$companyname = $_POST['companyname'];
	if($companyname)
	{
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
		$result = mysqli_query($link, "SELECT * FROM company");
		$check = 0;
		while($row = mysqli_fetch_array($result))
		{
			if($row['CompanyName'] == $companyname) 
			{
				echo "Here is the Description for " . $companyname.  ": ";
				echo "<br>";
				echo $row['CompanyDescription'];
				echo "<br>";
				$check = 1;
			}
		}
		if($check == 0)
		{
			echo "There were no Companies found by that name. Sorry!";
		}
	}
	else{
		echo "Please Fill in a Company Name";
	}
}
?>

<html>

</html>