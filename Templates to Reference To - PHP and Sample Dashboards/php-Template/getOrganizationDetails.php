<?php
$submit = $_POST['submit'];
if($submit)
{
	$organizationname = $_POST['organizationname'];
	if($organizationname)
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
		$result = mysqli_query($link, "SELECT * FROM organization");
		$check = 0;
		while($row = mysqli_fetch_array($result))
		{
			if($row['OrganizationName'] == $organizationname) 
			{
				echo "Here is the Description for " . $organizationname.  ": ";
				echo "<br>";
				echo $row['OrganizationDescription'];
				echo "<br>";
				$check = 1;
			}
		}
		if($check == 0)
		{
			echo "There were no Organizations found by that name. Sorry!";
		}
	}
	else{
		echo "Please Fill in an Organization Name";
	}
}
?>

<html>

</html>