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
	var availability = [];
	$('.availControl').each(function(index){
		if($(this).val() != ""){
			availability.push($(this).val());
		}
	});
	var fromtime = [];
	$('.fromControl').each(function(index){
		if($(this).val() != ""){
			fromtime.push($(this).val());
		}
	});	
	var totime = [];
	$('.toControl').each(function(index){
		if($(this).val() != ""){
			totime.push($(this).val());
		}
	});
	
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
	function addAvailability(){
		form_group = $('<div>',{class:"form-group row"});
		date_label = $('<label>',
			{class:"col-lg-2 control-label",
			 for:"inputAvailability",
			 text:"Date"});
		date_div = $('<div>',{
			class:"col-lg-10"
		});
		date_input = $('<input>',{
			type:"date",
			class:"form-control availControl",
		});
		date_div.append(date_input);
		form_group.append(date_label);
		form_group.append(date_div);

		from_label = $('<label>',
			{class:"col-lg-2 control-label",
			 for:"inputAvailability",
			 text:"From :"});
		from_div = $('<div>',{
			class:"col-lg-4"
		});
		from_input = $('<input>',{
			type:"time",
			class:"form-control fromControl",
		});
		from_div.append(from_input);
		form_group.append(from_label);
		form_group.append(from_div);

		to_label = $('<label>',
			{class:"col-lg-2 control-label",
			 for:"inputAvailability",
			 text:"To :"});
		to_div = $('<div>',{
			class:"col-lg-4"
		});
		to_input = $('<input>',{
			type:"time",
			class:"form-control toControl",
		});
		to_div.append(to_input);
		form_group.append(to_label);
		form_group.append(to_div);

	$('#availablityRow').append(form_group);
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
			if (data.length > 0) {
			resultsTable += "<<tr>" +
									"<th>Status</th>" +
									"<th>From</th>"  +
									"<th>TimeStamp</th>" +
								"</tr>";
				
			
			}
			for(i=0;i<data.length;i++){
				message = data[i];
				//alert(escapeHtml(message.Content));
				resultsTable += "<tr>";
				resultsTable += "<td onclick='openDDInboxMessage(\"" + message.DateTime + "\",\"" + message.DoctorUsername + "\"," +
								"\""+ message.FirstName + "\"," +
								"\""+ message.LastName + "\"," +
								"\""+ escapeHtml(message.Content) + "\"," +
								"\""+ message.Status + 
								
								"\")'>" + message.Status + "</td>" +
								"<td onclick='openDDInboxMessage(\"" + message.DateTime + "\",\"" + message.DoctorUsername + "\"," +
								"\""+ message.FirstName + "\"," +
								"\""+ message.LastName + "\"," +
								"\""+ escapeHtml(message.Content) + "\"," +
								"\""+ message.Status + 
								
								"\")'> Dr. " + message.FirstName + " " + message.LastName + "</td>" +
								"<td onclick='openDDInboxMessage(\"" + message.DateTime + "\",\"" + message.DoctorUsername + "\"," +
								"\""+ message.FirstName + "\"," +
								"\""+ message.LastName + "\"," +
								"\""+ escapeHtml(message.Content) + "\"," +
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
function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;")
		 .replace(/(\r\n|\n|\r)/gm, "<br>");
	
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
			
			loadUnreadMessages();
			$('#doctorMessage').modal('show');
			
			
		});
}

function getPDInbox(){
	
	$.get("../php/joey/getPatientToDoctorMessages.php",{},
		function(data){
		
			data = $.parseJSON(data);
		
			var resultsTable = "";
			if (data.length > 0) {
			resultsTable += "<<tr>" +
									"<th>Status</th>" +
									"<th>From</th>"  +
									"<th>TimeStamp</th>" +
								"</tr>";
				
			}
			
			for(i=0;i<data.length;i++){
				message = data[i];
				resultsTable += "<tr>";
				resultsTable += "<td onclick='openPDInboxMessage(\"" + message.DateTime + "\",\"" + message.PatientUsername + "\"," +
								"\""+ message.FirstName + "\"," +
								"\""+ message.LastName + "\"," +
								"\""+ escapeHtml(message.Content) + "\"," +
								"\""+ message.Status +
								
								"\")'>" + message.Status + "</td>" +
								"<td onclick='openPDInboxMessage(\"" + message.DateTime + "\",\"" + message.PatientUsername + "\"," +
								"\""+ message.FirstName + "\"," +
								"\""+ message.LastName + "\"," +
								"\""+ escapeHtml(message.Content) + "\"," +
								"\""+ message.Status + 
							
								"\")'>" + message.FirstName + " " + message.LastName + "</td>" +
								"<td onclick='openPDInboxMessage(\"" + message.DateTime + "\",\"" + message.PatientUsername + "\"," +
								"\""+ message.FirstName + "\"," +
								"\""+ message.LastName + "\"," +
								"\""+ escapeHtml(message.Content) + "\"," +
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
			
			loadUnreadMessages();
			$('#doctorMessage').modal('show');
			
			
		});
}

function getAllDoctors() {
	$.get('../php/joey/getAllDoctors.php',{},
		function(data){
			data = $.parseJSON(data);
			$('#alldocTable').empty();
			$('#alldocTable')
				.append($('<tr>')
					.append($('<td>',{text:'Doctor Name'})));
			for(var i=0;i<data.length;i++){
				$('#alldocTable')
					.append($('<tr>')
						.append($('<td>')
							.append($('<a>',{
										text:data[i].name,
										onclick: "openSendMessageDModal('"+ data[i].name+"','"+data[i].username+"');"
									})
								)
							)
						);
			}
			$('#doctorMessageList').modal('show');	
		});
}
function openSendMessageDModal(name,username){

	$('#d2ddocname').val(name);
	$('#d2ddocname').attr('data-d2dusername',username);
	$('#doctorMessageList').modal('hide');
	$('#sendDMessage').modal('show');
}

function sendD2DMessage() {
var messageContent = $('#d2dcontent').val();
var doctorUserName = $('#d2ddocname').attr('data-d2dusername');

	$.post('../php/joey/sendDtoDMessage.php',{
		postdoctorusername:doctorUserName,
		postcontent:messageContent,
		
	},function(data){
		if(data == "success")
			window.location.reload();
	});
}


function getAllPatients() {
	$.get('../php/joey/getAllPatients.php',{},
		function(data){
			data = $.parseJSON(data);
			$('#allpatTable').empty();
			$('#allpatTable')
				.append($('<tr>')
					.append($('<td>',{text:'Patient Name'})));
			for(var i=0;i<data.length;i++){
				$('#allpatTable')
					.append($('<tr>')
						.append($('<td>')
							.append($('<a>',{
										text:data[i].name,
										onclick: "openSendMessagePModal('"+ data[i].name+"','"+data[i].username+"');"
									})
								)
							)
						);
			}
			$('#patientMessageList').modal('show');	
		});
}
function openSendMessagePModal(name,username){

	$('#d2ppatname').val(name);
	$('#d2ppatname').attr('data-pmusername',username);
	$('#patientMessageList').modal('hide');
	$('#sendPMessage').modal('show');
}

function sendD2PMessage() {
var messageContent = $('#d2pcontent').val();
var patientUserName = $('#d2ppatname').attr('data-pmusername');

	$.post('../php/joey/sendDtoPMessage.php',{
		postpatientusername:patientUserName,
		postcontent:messageContent,
		
	},function(data){
		if(data == "success")
			window.location.reload();
	});
}

function loadUnreadMessages() {
	$.get("../php/joey/getUnreadMessagesP2D.php",{},
		function(data){
			if (data != 1) document.getElementById("newMessagesP").innerHTML=data + " unread patient messages";
			else if (data == 1) document.getElementById("newMessagesP").innerHTML=data + " unread patient message";
		});
		
		$.get("../php/joey/getUnreadMessagesD2D.php",{},
		function(data){
			if (data != 1) document.getElementById("newMessagesD").innerHTML=data + " unread doctor messages";
			else if (data == 1) document.getElementById("newMessagesD").innerHTML=data + " unread doctor message";
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

function displayPatients(){
	var patientname = $('#patientname').val();
	var patientphone = $('#patientphone').val();
	if (patientname.indexOf(" ") > -1) {
		var patientfirstname = patientname.substring(0, patientname.indexOf(" ", 0));
		var patientlastname = patientname.substring(patientname.indexOf(" ", 0)+1);
	} else {
		var patientfirstname = patientname;
		var patientlastname = "";
	}
	var resultsTable = "<tr><td>Patient Name</td><td>Phone Number</td><td>                       </td></tr>";
	$("#patienttable").append(resultsTable);
	$("#test").empty();
	$.post("../php/jordan/getPatients.php",{ postpatientfirstname:patientfirstname,
											 postpatientlastname:patientlastname,
											 postpatientphone:patientphone},
		function(data){
			data = $.parseJSON(data);
			var patients = data.patients;
			$('#patienttable').empty();
			for (var i = 0; i <patients.length; i++) {
				var patient = patients[i];
				resultsTable = resultsTable + "<tr>";
				resultsTable = resultsTable + "<td><label for='patientName'>" + patient.FirstName +
								" " + patient.LastName + "</label></td>";
				resultsTable = resultsTable + "<td><label for='patientPhone'>" + patient.HomePhone + "</label></td>";
				resultsTable = resultsTable + "<td><button type='button' onclick='loadVisits(\"" + patient.PatientUsername + "\");' class='btn btn-primary'>View</button>   ";
				
				// resultsTable = resultsTable + "<button type='button' onclick='showRecordVisitModal(\"" + patient.PatientUsername + "\");' class='record btn btn-primary'>Record a visit</button></td>";
				resultsTable = resultsTable + "<button type='button' data-toggle='modal' onclick='setPatient(\"" + patient.PatientUsername + "\");' 'href='#recordVisit' class='record btn btn-primary'>Record a visit</button></td>";
				//resultsTable = resultsTable + "<td><button type='button' onclick="displayMonthAppointments(); + " class="btn btn-primary"></button></td>";
 				resultsTable = resultsTable + "</tr>";
			};
			$("#patienttable").append(resultsTable);
		});
}

function setPatient(patient) {
	$.post("../php/jordan/setPatient.php",{ postpatient:patient});
	$('#recordVisit').modal('show');
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

function loadVisits(patientusername){
	var resultsTable = "<tr><td>Date of Visit</td></tr>";
	$('#test').append(resultsTable);
	$.post("../php/jordan/getVisitHistory.php",{postpatientusername:patientusername},
		function(data){
			data = $.parseJSON(data);
			$('#test').empty();
			for(i=0;i<data.length;i++){
				var visit = data[i];
				resultsTable += "<tr>";
				resultsTable += "<td onclick='displayVisitInfo(\"" + visit.Date + "\",\"" + patientusername +
								"\")'>" + visit.Date + "</td>";
				resultsTable += "</tr>";
			}
			if (!data.length) {
				resultsTable += "<tr><td>No Visits</td></tr>"
			}
			// $('#visitdatestable').append(resultsTable);
			$('#test').append(resultsTable);
			// $('#visitDetails').modal('show'); 
			// $('#visitDates').modal('show'); 
			//Something wrong with this modal call..displayPatients() will work before but not after
			// displayPatients();
		});
	

}

function displayVisitInfo(date, patient) {
	// var patientName = $(this).closest("tr").find("label[for=patientName]").text();
	$.get("../php/jordan/getVisitInfo.php",{getpatient:patient,getdate:date},
		function(data){
			data = $.parseJSON(data);
			var visitInfo = data.visitInfo;
			var medicines = data.medicines;
			var diagnosis = data.diagnosis;
			$('#doctorName').empty();
			$('#doctorName').append("Dr." + visitInfo.FirstName + " " + visitInfo.LastName);

			$('#systolicBP').empty();
			$('#systolicBP').append(visitInfo.sysBP);

			$('#diastolicBP').empty();
			$('#diastolicBP').append(visitInfo.diaBP);

			$('#diagnosis').empty();
			for(i=0;i<diagnosis.length;i++){
				d = diagnosis[i];
				$('#diagnosis').append(d + "<br>");
			}
			$('#medicinesPrescribedTable').empty();
			$('#medicinesPrescribedTable').append("<tr><td>Name</td><td>Dosage</td><td>Duration</td><td>Notes</td></tr>")
			for(var medicine in medicines){
				medTable = "<tr>";
				medTable += "<td>" + medicine + "</td>";
				medTable += "<td>" + medicines[medicine].Dosage + "</td>";
				medTable += "<td>" + medicines[medicine].Duration + "</td>";
				medTable += "<td>" + medicines[medicine].Notes + "</td>";
				$('#medicinesPrescribedTable').append(medTable);
			}

			$('#visitDetails').modal('show');
		});
}

function showRecordVisitModal(patient) {
	$('#recordVisit').modal('show');
	// $('#recordVisit-submit').on('click', recordVisit(patient));
	$('#recordVisit-submit').click(function(){
		e.recordVisit(patient);
	});
}

function recordVisit() {
	var visitdate = $('#visitdate').val();
	var systolicBP = $('#vSystolicBP').val();
	var diastolicBP = $('#vDiastolicBP').val();
	var diagnosis = [];
	$('.diagControl').each(function(index){
		if($(this).val() != ""){
				diagnosis.push($(this).val());
			}
	});
	var medname = [];
	$('.mednameControl').each(function(index){
		if($(this).val() != ""){
				medname.push($(this).val());
			}
	});
	var meddosage = [];
	$('.meddosageControl').each(function(index){
		if($(this).val() != ""){
				meddosage.push($(this).val());
			}
	});
	var medduration = [];
	$('.meddurationControl').each(function(index){
		if($(this).val() != ""){
				medduration.push($(this).val());
			}
	});
	var mednotes = [];
	$('.mednotesControl').each(function(index){
		if($(this).val() != ""){
				mednotes.push($(this).val());
			}
	});
	$.post('../php/jordan/recordVisit.php',{postvisitdate:visitdate,
											postsystolicbp:systolicBP,
											postdiastolicbp:diastolicBP,
											postdiagnosis:diagnosis,
											postmedname:medname,
											postmeddosage:meddosage,
											postmedduration:medduration,
											postmednotes:mednotes},
		function(data){
			$('#recordVisit').modal('hide');
			// $('.modal-body', '#recordVisit').empty();
			if(data == "success") {
				window.location = "DoctorDashboard/doctorDashboard.html";
			}
		});
}
function addDiagnosis(){
	form_group = $('<div>',{class:"form-group row"});
	diagnosis_label = $('<label>',
			{class:"col-lg-2 control-label",
			for:"inputDiagnosis",
			text:"Diagnosis: "});
	diagnosis_div = $('<div>',{
			class:"col-lg-8"
	});
	diagnosis_input = $('<input>',{
			type:"text",
			class:"form-control diagControl",
	});
	diagnosis_div.append(diagnosis_input);
	form_group.append(diagnosis_label);
	form_group.append(diagnosis_div);
	$('#diagnosisRow').append(form_group);
}

// function addMedication() {
// 	form_group = $('<div>',{class:"form-group row"});
// 	date_label = $('<label>',
// 		{class:"col-lg-2 control-label",
// 		 for:"inputMedName",
// 	     text:"Medicine Name: "});
// 	date_div = $('<div>',{
// 		class:"col-lg-10"
// 	});
// 	date_input = $('<input>',{
// 		type:"Text",
// 		class:"form-control mednameControl",
// 	});
// 	date_div.append(date_input);
// 	form_group.append(date_label);
// 	form_group.append(date_div);
	
// 	form_group2 = $('<div>',{class:"form-group row"});
// 	from_label = $('<label>',
// 		{class:"col-lg-2 control-label",
// 		 for:"inputMedDosage",
// 	     text:"Dosage: "});
// 	from_div = $('<div>',{
// 		class:"col-lg-10"
// 	});
// 	from_input = $('<input>',{
// 		type:"Text",
// 		class:"form-control meddosageControl",
// 	});
// 	from_div.append(from_input);
// 	form_group2.append(from_label);
// 	form_group2.append(from_div);

// 	form_group3 = $('<div>',{class:"form-group row"});
// 	to_label = $('<label>',
// 		{class:"col-lg-2 control-label",
// 		 for:"inputMedDuration",
// 	     text:"Duration: "});
// 	to_div = $('<div>',{
// 		class:"col-lg-10"
// 	});
// 	to_input = $('<input>',{
// 		type:"Text",
// 		class:"form-control meddurationControl",
// 	});
// 	to_div.append(to_input);
// 	form_group3.append(to_label);
// 	form_group3.append(to_div);

// 	form_group4 = $('<div>',{class:"form-group row"});
// 	mednotes_label = $('<label>',
// 		{class:"col-lg-2 control-label",
// 		 for:"inputMedNotes",
// 	     text:"Notes: "});
// 	mednotes_div = $('<div>',{
// 		class:"col-lg-10"
// 	});
// 	mednotes_input = $('<input>',{
// 		type:"Text",
// 		class:"form-control mednotesControl",
// 	});
// 	mednotes_div.append(mednotes_input);
// 	form_group4.append(mednotes_label);
// 	form_group4.append(mednotes_div);

// 	$('#medicationRow').append(form_group);
// 	$('#medicationRow').append(form_group2);
// 	$('#medicationRow').append(form_group3);
// 	$('#medicationRow').append(form_group4);
// }

/*This is addMedication working for medTable*/
function addMedication(){
	table_row = $('<tr>');
	medname_cell = $('<td>');
	medname_input = $('<input>',{
			type:"Text",
			class:"form-control mednameControl",
	});
	medname_endcell = $('</td>');
	medname_cell.append(medname_input);
	table_row.append(medname_cell);
	table_row.append(medname_endcell);

	meddosage_cell = $('<td>');
	meddosage_input = $('<input>',{
			type:"Text",
			class:"form-control meddosageControl",
	});
	meddosage_endcell = $('</td>');
	meddosage_cell.append(meddosage_input);
	table_row.append(meddosage_cell);
	table_row.append(meddosage_endcell);

	medduration_cell = $('<td>');
	medduration_input = $('<input>',{
			type:"Text",
			class:"form-control meddurationControl",
	});
	medduration_endcell = $('</td>');
	medduration_cell.append(medduration_input);
	table_row.append(medduration_cell);
	table_row.append(medduration_endcell);

	mednotes_cell = $('<td>');
	mednotes_input = $('<input>',{
			type:"Text",
			class:"form-control mednotesControl",
	});
	mednotes_endcell = $('</td>');
	mednotes_cell.append(mednotes_input);
	table_row.append(mednotes_cell);
	table_row.append(mednotes_endcell);

	table_endrow = $('</tr>');

	table_row.append(table_endrow);

	$('#medicationtable').append(table_row);
}

$(document).on("click", ".recordVisit", function() {
	var patient = $(this).data('id');
	var visitdate = $('#visitdate').val();
	var systolicBP = $('#systolicBP').val();
	var diastolicBP = $('#diastolicBP').val();
	var diagnosis = [];
	$('.diagControl').each(function(index){
		if($(this).val() != ""){
				diagnosis.push($(this).val());
			}
	});
	var medname = [];
	$('.mednameControl').each(function(index){
		if($(this).val() != ""){
				medname.push($(this).val());
			}
	});
	var meddosage = [];
	$('.meddosageControl').each(function(index){
		if($(this).val() != ""){
				meddosage.push($(this).val());
			}
	});
	var medduration = [];
	$('.meddurationControl').each(function(index){
		if($(this).val() != ""){
				medduration.push($(this).val());
			}
	});
	var mednotes = [];
	$('.mednotesControl').each(function(index){
		if($(this).val() != ""){
				mednotes.push($(this).val());
			}
	});
	$.post('../php/jordan/recordVisit.php',{postpatient:patient,
											postvisitdate:visitdate,
											postsystolicbp:systolicBP,
											postdiastolicbp:diastolicBP,
											postdiagnosis:diagnosis,
											postmedname:medname,
											postmeddosage:meddosage,
											postmedduration:medduration,
											postmednotes:mednotes},
		function(data){
			if(data == "success") {
				window.location = "DoctorDashboard/doctorDashboard.html";
			}
		} );
})

$(document).ready(function () {	
	load();
	getDoctorProfile();
	loadUnreadMessages();
	var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var today = year + "-" + month + "-" + day;
    $("#apptday").attr("value", today);   
    displayAppointments();    
    $("#visitdate").attr("value", today);
	$('#recordVisit').on('hidden', function() {
		$('#vSystolicBP').val("");
	});
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

