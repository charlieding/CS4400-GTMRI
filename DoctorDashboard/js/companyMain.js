function logout(){
	var r = confirm("Do you really want to log out?");
	if (r) {
	   window.location.href = '../php/logout.php'
	}
}
function updateDoctor(){
	var licnum =  $('#licnum').val();
	var fname = $('#dfname').val();
	var lname = $('#dlname').val();
	var dob = $('#dDOB').val();
	var workphone = $('#dworkphone').val();
	var specialty = $('#specialty').val();
	var roomnum = $('#roomnum').val();
	var address = $('#daddress').val();
	var availability = $('#availability').val();
	var fromtime = $('#fromtime').val();
	var totime = $('#totime').val();
	
	$.post('../php/joey/updateDoctorProfile.php',{postlicnum:licnum,
											postfname:fname, 
											postlname:lname,
											postdob:dob,
											postworkphone:workphone,
											postspecialty:specialty,
											postroomnum:roomnum,
											postaddress:address,
											postavailability:availability,
											postfromtime:fromtime,
											posttotime:totime},
			function(data){
				if(data == "success"){
					window.location = "doctorDashboard.html";
				}else {
					$('#result4').html(data);
				}
			});

	}
	
function getDoctorProfile(){
	
	$.get("../php/joey/getDoctorProfile.php",{},
		function(data){
		
			data = $.parseJSON(data);
			
				var profile = data.profile;
				var avails = data.avail;

				$('#licnum').empty();
				$('#licnum').val(profile.LicenseNumber);
				
				$('#dfname').empty();
				$('#dfname').val(profile.FirstName);
				
				$('#dlname').empty();
				$('#dlname').val(profile.LastName);
							
				$('#dDOB').empty();
				$('#dDOB').val(profile.DOB);
				
				$('#dworkphone').empty();
				$('#dworkphone').val(profile.WorkPhone);
				
				var dd = document.getElementById('specialty');
				for (var i = 0; i < dd.options.length; i++) {
					if (dd.options[i].value === profile.Specialty) {
						dd.selectedIndex = i;
						break;
					}
				}
		
				$('#roomnum').empty();
				$('#roomnum').val(profile.RoomNumber);
				
				$('#daddress').empty();
				$('#daddress').val(profile.HomeAddress);
				
				$('#availability').empty();
				$('#availability').val(avails.day);
				
				$('#fromtime').empty();
				$('#fromtime').val(avails.start);
				
				$('#totime').empty();
				$('#totime').val(avails.end);
				
				
	    });	
	}
function displayAppointments(){
	var apptday = $('#apptday').val();
	var resultsTable = "<tr> <td>Sno</td><td>Patient Name</td><td>Scheduled Time</td></tr>";
	$("#appointmenttable").append(resultsTable);
	$.post("../php/jordan/getAppointments.php",{ postapptday:apptday},
		function(data){
			data = $.parseJSON(data);
			var appointments = data.appointments;
			$('#appointmenttable').empty();
			var resultsTable = "<tr> <td>Sno</td><td>Patient Name</td><td>Scheduled Time</td></tr>";
			for (var i = 0; i <appointments.length; i++) {
				var appointment = appointments[i];
				resultsTable = resultsTable + "<tr>";
				resultsTable = resultsTable + "<td>" + (i+1) + "</td>";
				resultsTable = resultsTable + "<td>" + appointment.FirstName +
								" " + appointment.LastName + "</td>";
				resultsTable = resultsTable + "<td>" + appointment.StartTime + "-" + 
							    appointment.EndTime;
				resultsTable = resultsTable + "</tr>";
			};
			$("#appointmenttable").append(resultsTable);
		});
}

function getDDInbox(){

	$.get("../php/joey/getDoctorToDoctorMessages.php",{},
		function(data){
		
			data = $.parseJSON(data);
		
			var resultsTable = "";
			for(i=0;i<data.length;i++){
				message = data[i];
				resultsTable += "<<tr>" +
									"<th>Status</th>" +
									"<th>From</th>"  +
									"<th>TimeStamp</th>" +
								"</tr>";
				resultsTable += "<tr>";
				resultsTable += "<td onclick='openDDInboxMessage(\"" + message.DateTime + "\",\"" + message.DoctorUsername + "\"," +
								"\""+ message.FirstName + "\"," +
								"\""+ message.LastName + "\"," +
								"\""+ message.Content + "\"," +
								"\""+ message.Status + 
								
								"\")'>" + message.Status + "</td>" +
								"<td onclick='openDDInboxMessage(\"" + message.DateTime + "\",\"" + message.DoctorUsername + "\"," +
								"\""+ message.FirstName + "\"," +
								"\""+ message.LastName + "\"," +
								"\""+ message.Content + "\"," +
								"\""+ message.Status + 
								
								"\")'> Dr. " + message.FirstName + " " + message.LastName + "</td>" +
								"<td onclick='openDDInboxMessage(\"" + message.DateTime + "\",\"" + message.DoctorUsername + "\"," +
								"\""+ message.FirstName + "\"," +
								"\""+ message.LastName + "\"," +
								"\""+ message.Content + "\"," +
								"\""+ message.Status + 
								
								"\")'>" + message.DateTime + "</td>";
				resultsTable += "</tr>";
			}
			if (data.length == 0) alert("You have no messages at this time!");
			else {
				$('#ddInboxMessages').empty();
				$('#ddInboxMessages').append(resultsTable);
				$('#ddInbox').modal('show');
			}
			
			
		});
}
function openDDInboxMessage(date, doctor, firstname, lastname, content, status) {

	$('#ddInbox').modal('hide');

	$.post("../php/joey/setDtoDRead.php",{postdoctorusername:doctor,postdate:date},
		function(data){
		
			
			$('#dmdoctorname').empty();
			$('#dmdoctorname').append("Dr. " + firstname + " " + lastname);
		
			$('#dmcontent').empty();
			$('#dmcontent').append(content);

			$('#dmdatetime').empty();
			$('#dmdatetime').append(date);
			
			$('#dmstatus').empty();
			$('#dmstatus').append(status);
			
			$('#doctorMessage').modal('show');
			
			
		});
}

function getPDInbox(){
	
	$.get("../php/joey/getPatientToDoctorMessages.php",{},
		function(data){
		
			data = $.parseJSON(data);
		
			var resultsTable = "";
			for(i=0;i<data.length;i++){
				message = data[i];
				resultsTable += "<<tr>" +
									"<th>Status</th>" +
									"<th>From</th>"  +
									"<th>TimeStamp</th>" +
								"</tr>";
				resultsTable += "<tr>";
				resultsTable += "<td onclick='openPDInboxMessage(\"" + message.DateTime + "\",\"" + message.PatientUsername + "\"," +
								"\""+ message.FirstName + "\"," +
								"\""+ message.LastName + "\"," +
								"\""+ message.Content + "\"," +
								"\""+ message.Status +
								
								"\")'>" + message.Status + "</td>" +
								"<td onclick='openPDInboxMessage(\"" + message.DateTime + "\",\"" + message.PatientUsername + "\"," +
								"\""+ message.FirstName + "\"," +
								"\""+ message.LastName + "\"," +
								"\""+ message.Content + "\"," +
								"\""+ message.Status + 
							
								"\")'> Dr. " + message.FirstName + " " + message.LastName + "</td>" +
								"<td onclick='openPDInboxMessage(\"" + message.DateTime + "\",\"" + message.PatientUsername + "\"," +
								"\""+ message.FirstName + "\"," +
								"\""+ message.LastName + "\"," +
								"\""+ message.Content + "\"," +
								"\""+ message.Status + 
								
								"\")'>" + message.DateTime + "</td>";
				resultsTable += "</tr>";
			}
			if (data.length == 0) alert("You have no messages at this time!");
			else {
				$('#pdInboxMessages').empty();
				$('#pdInboxMessages').append(resultsTable);
				$('#pdInbox').modal('show');
			}
			
			
		});
}
function openPDInboxMessage(date, patient, firstname, lastname, content, status) {

	$('#pdInbox').modal('hide');

	$.post("../php/joey/setPtoDRead.php",{postpatientusername:patient,postdate:date},
		function(data){
		
			
			$('#dmdoctorname').empty();
			$('#dmdoctorname').append(firstname + " " + lastname);
		
			$('#dmcontent').empty();
			$('#dmcontent').append(content);

			$('#dmdatetime').empty();
			$('#dmdatetime').append(date);
			
			$('#dmstatus').empty();
			$('#dmstatus').append(status);
			
			$('#doctorMessage').modal('show');
			
			
		});
}







function displayMonthAppointments(){
	var apptday = $('#apptday').val();
	apptday = apptday.substring(0,8);
	apptday += "dd";
	var resultsTable = "<tr> <td>Sno</td><td>Patient Name</td><td>Scheduled Date</td><td>Scheduled Time</td></tr>";
	$("#appointmenttable").append(resultsTable);
	$.post("../php/jordan/getAppointments.php",{ postapptday:apptday},
		function(data){
			data = $.parseJSON(data);
			var appointments = data.appointments;
			$('#appointmenttable').empty();
			var resultsTable = "<tr> <td>Sno</td><td>Patient Name</td><td>Scheduled Date</td><td>Scheduled Time</td></tr>";
			for (var i = 0; i <appointments.length; i++) {
				var appointment = appointments[i];
				resultsTable = resultsTable + "<tr>";
				resultsTable = resultsTable + "<td>" + (i+1) + "</td>";
				resultsTable = resultsTable + "<td>" + appointment.FirstName +
								" " + appointment.LastName + "</td>";
				resultsTable = resultsTable + "<td>" + appointment.Date + "</td>";
				resultsTable = resultsTable + "<td>" + appointment.StartTime + "-" + 
							    appointment.EndTime;
				resultsTable = resultsTable + "</tr>";
			};
			$("#appointmenttable").append(resultsTable);
		});
}



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

function Slider ($object) {
	var slider = this;
	slider.object = $object;
	slider.hiddenPos = (-$object.outerWidth(false)) + "px";
	slider.object.css('left', slider.hiddenPos);
	
	slider.open = function () {
		slider.object.animate({
			left: 0
		}, 1000);
	};
	slider.close = function () {
		slider.object.animate({
			left: slider.hiddenPos
		}, 1000);
	};
}

var hindex = 0;
var hints = [
	"Search for a package that best suits your style - Categories, Ethnicity, Sports, Races, etc.",
	"Click on the company details button to edit your company profile.",
	"Click on the star to save the package for later review.",
	"Click on the trashcan to remove the package from your saved package list."
];
function hint_left()
{
	--hindex;
	if (hindex < 0) hindex = hints.length - 1;
	updateHint();
}
function hint_right()
{
	hindex = (hindex + 1) % hints.length;
	updateHint();
}
function updateHint()
{
	var hint = hints[hindex];
	$('#hint').html(hint);
	$('#hintCount').html((hindex + 1) + "/" + hints.length);
}
updateHint();

$(document).ready(function () {	
	load();
	getDoctorProfile();
	$('#companyDetails')
		.on('change', CompanyDetails.update);

	var slider = new Slider($('.SideSlider'));
	$('body').on('click', '.SideSlider', function (event) {
		event.stopPropagation();
		slider.open();
	}).on('click', function () {
		slider.close();
	});
		
	function load(){
	
		load_CompanyInfo();
		load_allPackages();
		initTabView();
		load_Sponsorshiplist();
		load_Wishlist();
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
				}

				var defaultTab = document.getElementsByClassName('default-tab')
				  if (defaultTab.length) {
					defaultTab[0].style.display = 'block';
					prevViewedTab = defaultTab[0];
				  }
			  }
	});

