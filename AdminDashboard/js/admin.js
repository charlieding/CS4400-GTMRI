$(document).ready(function () {	
	initTabView();
	initialize();
});
function initialize(){
	$("#visitDate").empty();
	$("#visitDateCost").empty();
	$("#surgery").empty();
	$("#surgeryCost").empty();
	document.getElementById("totalCost").innerHTML = "$0";
	document.getElementById("name").innerHTML = "[Patient Name Here]";
	document.getElementById("phonenumber").innerHTML = "[Patient's Home Phone Number]";

	//Other Initializations - albiet no one can see it...
	$("#surgerytable tr").empty();
	//$("#surgerytable").prepend("<tr class=\"success\"><th>Surgery Type</th><th>CPT Code</th><th># of Procedures</th><th># of Doctors Performing the Procedure</th><th>Total Billing ($)</th></tr>");
	$("#patientvisittable tr").empty();
	$("#doctorPerformanceReport tr").empty();
	//$("#patientvisittable").prepend("<tr class=\"success\"><th>Doctor Name</th><th># of Patients Seen</th><th># of Prescriptions Written</th><th>Total Billing ($)</th></tr>");

}
/*

function trashIcon(ele){
	var cost = ele.parentNode.parentNode.parentNode.getElementsByTagName('a')[0].innerHTML;
	var name = ele.getElementsByTagName('span')[0].innerHTML;
	var details = ele.parentNode.parentNode.parentNode.getElementsByTagName('small')[0].innerHTML;
	console.log("trash");

	var details = ele.parentNode.parentNode.parentNode.getElementsByTagName('small')[0].innerHTML;
		$.post("../php/charles/deletePackageFromWishlist.php", {costValue: cost, packageName:name, packageDetails:details},
		function(data)
		{
			//console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
			//load_Wishlist()();
		}, 'json');
		console.log("3 seconds until wishlist refresh...");
		setTimeout(function(){
			load_Wishlist();
		},3000);

}
function wishlist(ele){
	var cost = ele.parentNode.parentNode.parentNode.getElementsByTagName('a')[0].innerHTML;
	var name = ele.getElementsByTagName('span')[0].innerHTML;
	var details = ele.parentNode.parentNode.parentNode.getElementsByTagName('small')[0].innerHTML;
	console.log("wish");

	var details = ele.parentNode.parentNode.parentNode.getElementsByTagName('small')[0].innerHTML;
		$.post("../php/charles/addPackageToWishlist.php", {costValue: cost, packageName:name, packageDetails:details},
		function(data)
		{
			//console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
			//load_Wishlist();
		}, 'json');
		console.log("3 seconds until sponsorshiplist refresh...");
		setTimeout(function(){
			load_Wishlist();
		},3000);


}
function sponsor(ele){
	var cost = ele.parentNode.parentNode.parentNode.getElementsByTagName('a')[0].innerHTML;
	var name = ele.getElementsByTagName('span')[0].innerHTML;
	var details = ele.parentNode.parentNode.parentNode.getElementsByTagName('small')[0].innerHTML;
	console.log("sponsor");
	
	var details = ele.parentNode.parentNode.parentNode.getElementsByTagName('small')[0].innerHTML;
		$.post("../php/charles/sponsorPackage.php", {costValue: cost, packageName:name, packageDetails:details},
		function(data)
		{
			//console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
			//load_Sponsorshiplist();
		}, 'json');
		console.log("3 seconds until sponsorshiplist refresh...");
		setTimeout(function(){
			load_Sponsorshiplist();
		},3000);
	
}
function load_Wishlist(){
	console.log("starting loading wishlist");
	$.post("../php/charles/loadWishlist.php", {postsearch: 'test'},
	function(data)
	{	
		console.log("wishlist list load data:")
		console.log(data);
		console.log(data.result);
		$("#wishlist").empty();
		$.each(data.result, function(){
		    $("#wishlist").prepend("<div><div class=\"panel panel-success panel-default\"><div class=\"panel-heading panel-success\"><h3 class=\"panel-title\"><span> "+this['Package Name']+ "</span><span class=\"pull-right\"><span onclick=\"sponsor(this.parentNode.parentNode)\" class=\"glyphicon glyphicon-gift\">"+"&nbsp"+"</span><span onclick=\"trashIcon(this.parentNode.parentNode)\" class=\"glyphicon glyphicon-trash\">"+"&nbsp"+"</span></span></h3></div><div class=\"panel-body\"><div class=\"\"><blockquote class=\"pull-left text-muted\"><small>"+this['Detail']+"</small></blockquote><a class=\"pull-right\"> $"+this['Price']+"</a></div></div></div></div>");
		});
	}, 'json');
}
function load_Sponsorshiplist(){
	console.log("starting loading sponsorshiplist");
	$.getJSON("../php/charles/loadSponsorshiplist.php", function (data){	
		console.log("Sponsorship list load data:")
		console.log(data);
		console.log(data.resultlist);
		$("#sponsoredlist").empty();
		$.each(data.resultlist, function(){
		    $("#sponsoredlist").prepend("<div><div class=\"panel panel-success panel-default\"><div class=\"panel-heading panel-success\"><h3 class=\"panel-title\"><span> "+this['Package Name']+ "</span><span class=\"pull-right\"></span></h3></div><div class=\"panel-body\"><div class=\"\"><blockquote class=\"pull-left text-muted\"><small>"+this['Detail']+"</small></blockquote><a class=\"pull-right\"> $"+this['Price']+"</a></div></div></div></div>");
		});
	});
}

function search(){
	var searchValue = $('#searchValue').val();
	if(searchValue == "") {
		$.getJSON("../php/getAllPackages.php", function (data) {
			$("#packages").empty();
			$.each(data.result, function(){
			    $("#packages").prepend("<div><div class=\"panel panel-success panel-default\"><div class=\"panel-heading panel-success\"><h3 class=\"panel-title\"><span> "+this['Package Name']+ "</span><span class=\"pull-right\"><span onclick=\"sponsor(this.parentNode.parentNode)\" class=\"glyphicon glyphicon-gift\">"+"&nbsp"+"</span><span onclick=\"wishlist(this.parentNode.parentNode)\" class=\"glyphicon glyphicon-star\"></span></span></h3></div><div class=\"panel-body\"><div class=\"\"><blockquote class=\"pull-left text-muted\"><small>"+this['Detail']+"</small></blockquote><a class=\"pull-right\"> $"+this['Price']+"</a></div></div></div></div>");
			});
		});
	}
	else {
		$.post("../php/search.php", {postsearch: searchValue},
		function(data)
		{	
			$("#packages").empty();
			$.each(data.result, function(){
			    $("#packages").prepend("<div><div class=\"panel panel-success panel-default\"><div class=\"panel-heading panel-success\"><h3 class=\"panel-title\"><span> "+this['Package Name']+ "</span><span class=\"pull-right\"><span onclick=\"sponsor(this.parentNode.parentNode)\" class=\"glyphicon glyphicon-gift\">"+"&nbsp"+"</span><span onclick=\"wishlist(this.parentNode.parentNode)\" class=\"glyphicon glyphicon-star\"></span></span></h3></div><div class=\"panel-body\"><div class=\"\"><blockquote class=\"pull-left text-muted\"><small>"+this['Detail']+"</small></blockquote><a class=\"pull-right\"> $"+this['Price']+"</a></div></div></div></div>");
			});
		}, 'json');
	}
}

var CompanyDetails = {
	update: function() {
		var details = CompanyDetails.get();
		$.post('../php/updateCompanyDetails.php', details);
	},
	get: function() {
		var email = $('#email').val();
		var name = $('#companyName').val();
		var description = $('#description').val();
		
		var details = {
			postCompanyEmail: email,
			postCompanyName: name,
			postCompanyDescription: description
		};
		console.log(details);
		return details;
	}
}
	function load_CompanyInfo(){
		$.getJSON("../php/getCompany.php",
			function(data)
			{
				console.log(data);
				var details = data["companyDetails"][0];
				console.log(details);
				$("#email").val(details["emailAddress"]);
				$("#companyName").val(details["companyName"]);
				$("#description").val(details["companyDescription"]);
			});
	}
	function load_allPackages() {
		$.getJSON("../php/getAllPackages.php", function (data) {
			$("#packages").empty();
			$.each(data.result, function(){
			    $("#packages").prepend("<div><div class=\"panel panel-success panel-default\"><div class=\"panel-heading panel-success\"><h3 class=\"panel-title\"><span> "+this['Package Name']+ "</span><span class=\"pull-right\"><span onclick=\"sponsor(this.parentNode.parentNode)\" class=\"glyphicon glyphicon-gift\">"+"&nbsp"+"</span><span onclick=\"wishlist(this.parentNode.parentNode)\" class=\"glyphicon glyphicon-star\"></span></span></h3></div><div class=\"panel-body\"><div class=\"\"><blockquote class=\"pull-left text-muted\"><small>"+this['Detail']+"</small></blockquote><a class=\"pull-right\"> $"+this['Price']+"</a></div></div></div></div>");
			});
		});
	}
*/

function logout(){
	var r = confirm("Do you really want to log out?");
	if (r) {
	   window.location.href = '../php/logout.php'
	}
}
function initTabView(){
	var x = document.getElementsByClassName('tab-view')
	for(var i=0; i < x.length; i++) {
	  x[i].onclick = displayTab;
	}
	var prevViewedTab = null;
	function displayTab(e) {
		var idOfTabToDisplay = this.getAttribute("data-tab")
		if(prevViewedTab) {
		  prevViewedTab.style.display = 'none';
		}
		var tabToDisplay = document.getElementById(idOfTabToDisplay);
		tabToDisplay.style.display = 'block';
		prevViewedTab = tabToDisplay;
		//console.log("Tab Pressed: "+tabToDisplay + idOfTabToDisplay);
		if(idOfTabToDisplay == "tab1"){
			console.log("Billing Tab Pressed");
		}
		if(idOfTabToDisplay == "tab2"){
			console.log("Doctor Performance Tab Pressed");
			doctorPerformance();
		}
		if(idOfTabToDisplay == "tab3"){
			console.log("Surgery Report Tab Pressed");
			surgeryReport();
		}
		if(idOfTabToDisplay == "tab4"){
			console.log("Patient Visit Report Tab Pressed");
		}
	}
	var defaultTab = document.getElementsByClassName('default-tab');
	if (defaultTab.length) {
		defaultTab[0].style.display = 'block';
		prevViewedTab = defaultTab[0];
  	}
}
function billing(){
	console.log("loading billing...");
	var patientName = $('#patientName').val();
	var res = patientName.split(" ");
	var firstName = res[0];
	var lastName = res[1];
	var totalCost = 0;
	//Get Patient's Phone Number
	$.post("../php/charles/billing/getPhoneNumber.php", {postFirstName: firstName, postLastName:lastName},
		function(data)
		{
			document.getElementById("name").innerHTML = patientName;
			document.getElementById("phonenumber").innerHTML = data;
			console.log("Phone # SUCCESS: "+ data);
		}, 'text');

	//Get Patient Visit History
	$.post("../php/charles/billing/visitHistory.php", {postFirstName: firstName, postLastName:lastName},
		function(data)
		{
			$("#visitDate").empty();
			$("#visitDateCost").empty();
			$.each(data.resultlist, function(){
				totalCost = totalCost+parseFloat(this['Price']);
				$("#visitDate").prepend("<small>"+this['Visit Date']+" Visit </small><h2></h2>");
				$("#visitDateCost").prepend("<a class=\"pull-right\"> $"+this['Price']+"</a><br>");
			});
			//Update Total Cost
			document.getElementById("totalCost").innerHTML = "$" + totalCost;
			console.log("Visit History SUCCESS: "+ data);
		}, 'json');

	//Get Patient Surgery History
	$.post("../php/charles/billing/surgeryHistory.php", {postFirstName: firstName, postLastName:lastName},
		function(data)
		{
			$("#surgery").empty();
			$("#surgeryCost").empty();
			$.each(data.resultlist, function(){
				totalCost = totalCost+parseFloat(this['Price']);
				$("#surgery").prepend("<small>"+this['Surgery Type']+" Surgery </small><h2></h2>");
				$("#surgeryCost").prepend("<a class=\"pull-right\"> $"+this['Price']+"</a><br>");
			});
			//Update Total Cost
			document.getElementById("totalCost").innerHTML = "$" + totalCost;
			console.log("Surgery History SUCCESS: "+ data);
		}, 'json');	
}
function doctorPerformance(){
	console.log("loading doctor performance report...");
	$.getJSON("../php/charles/doctorperformancereport/doctorPerformanceReport.php", function (data){
		$("#doctorPerformanceReport tr").empty();
		$("#doctorPerformanceReport").prepend("<tr class=\"success\"><th colspan=\"1\">Specialty</th><th colspan=\"1\">Average Rating</th><th colspan=\"1\"># of Surgeries Performed</th></tr>");

		$.each(data.resultlist, function(){
		    $("#doctorPerformanceReport").append("<tr class=\"danger\"><td>"+this['Surgery Type']+"</td><td>"+this['Average Rating']+"</td><td>"+this['NumOfSurgeries']+"</td></tr>");
		});
		console.log("Surgery Report SUCCESS: "+ data);
	});
}
function surgeryReport(){
	console.log("loading surgery report");
	$.getJSON("../php/charles/surgeryreport/surgeryReport.php", function (data){
		$("#surgerytable tr").empty();
		$("#surgerytable").prepend("<tr class=\"success\"><th>Surgery Type</th><th>CPT Code</th><th># of Procedures</th><th># of Doctors Performing the Procedure</th><th>Total Billing ($)</th></tr>");

		$.each(data.resultlist, function(){
			var SurgeryPrice = parseInt(this['Price']);
			var NumProcedures= parseInt(this['NumProcedures']);
			var NumDiscounts = parseInt(this['NumOfDiscounts']);
			var totalPrice = SurgeryPrice*(NumProcedures-NumDiscounts) + (SurgeryPrice/2)*NumDiscounts;
		    $("#surgerytable").append("<tr class=\"danger\"><td>"+this['Surgery Type']+"</td><td>"+this['CPT Code']+"</td><td>"+this['NumProcedures']+"</td><td>"+this['NumDoctors']+"</td><td>"+totalPrice+"</td></tr>");
		});
		console.log("Surgery Report SUCCESS: "+ data);
	});
}
function patientVisitReport(){
	console.log("loading patient visit report...");
	var month = $('#month').val();
	var year = $('#year').val();
	var monthNumber = '';
	if(month == "January"){
		monthNumber = '01';
	}else if(month == "February"){
		monthNumber = '02';
	}else if(month == "March"){
		monthNumber = '03';
	}else if(month == "April"){
		monthNumber = '04';
	}else if(month == "May"){
		monthNumber = '05';
	}else if(month == "June"){
		monthNumber = '06';
	}else if(month == "July"){
		monthNumber = '07';
	}else if(month == "August"){
		monthNumber = '08';
	}else if(month == "September"){
		monthNumber = '09';
	}else if(month == "October"){
		monthNumber = '10';
	}else if(month == "November"){
		monthNumber = '11';
	}else if(month == "December"){
		monthNumber = '12';
	}
	//php call
	$.post("../php/charles/patientvisitreport/patientVisitReport.php", {postMonth: monthNumber, postYear:year},
		function(data)
		{
		$("#patientvisittable tr").empty();
		$("#patientvisittable").prepend("<tr class=\"success\"><th>Doctor Name</th><th># of Patients Seen</th><th># of Prescriptions Written</th><th>Total Billing ($)</th></tr>");

		$.each(data.resultlist, function(){
		    $("#patientvisittable").append("<tr class=\"danger\"><td>Dr. "+this['FirstName']+" "+this['LastName']+"</td><td>"+this['NumPrescriptions']+"</td><td>"+this['NumPatients']+"</td><td>"+this['Price']+"</td></tr>");
		});
		console.log("Patient Visit Report SUCCESS: "+ data);
		}, 'json');
}