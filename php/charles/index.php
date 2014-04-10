<html>
	<form action='login.php' method='POST'>
		Username:<input type='text' name='username'><br>
		Password:<input type='password' name='password'><br>
		<input type='submit' value='Log in'>
	</form>
	<form action='register.php' method='POST'>
		New Username:<input type='text' name='newusername'><br>
		New Password:<input type='password' name='newpassword'><br>
		New email:<input type='text' name='newemail'><br>
		<input type='submit' name='submit' value='Register'>
	</form>
	<form action='getOrganizationDetails.php' method='POST'>
		Organization Name:<input type='text' name='organizationname'><br>
		<input type='submit' name='submit' value='Get Organization Details'>
	</form>
	<form action='getCompanyDetails.php' method='POST'>
		Company Name:<input type='text' name='companyname'><br>
		<input type='submit' name='submit' value='Get Company Details'>
	</form>
</html>