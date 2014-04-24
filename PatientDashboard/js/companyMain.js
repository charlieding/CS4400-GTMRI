function logout(){
	var r = confirm("Do you really want to log out?");
	if (r) {
	   window.location.href = '../php/logout.php'
	}
}

function searchSpecialists(){
	var speciality = $('#specialty').val();
	$.post("../php/abhijit/getSpecialists.php",{ postspeciality:speciality},
		function(data){
			$('#request_btn').removeClass('hidden');
			data = $.parseJSON(data);
			var doctors = data.doctors;
			var ratings = data.ratings;
			$('#doctable').empty();
			var resultsTable = "<tr> <td>Doctor Name</td><td>Phone Number</td><td>Room Number</td><td>Availability</td><td>Average Rating</td></tr>";
			for (var i = 0; i <doctors.length; i++) {
				var doctor = doctors[i];
				resultsTable = resultsTable + "<tr>";
				resultsTable = resultsTable + "<td>Dr." + doctor.FirstName +
								" " + doctor.LastName + "</td>";
				if(doctor.WorkPhone != "0"){
					resultsTable = resultsTable + "<td>" + doctor.WorkPhone + "</td>";
				}else {
					resultsTable = resultsTable + "<td>N/A</td>";
				}
				resultsTable = resultsTable + "<td>" + doctor.RoomNumber + "</td>"
				resultsTable = resultsTable + "<td>" + doctor.Day + ": " + doctor.StartTime + "-" + 
							    doctor.EndTime;
				resultsTable = resultsTable + "<button type='button' onclick='requestAppointment(\""+
								doctor.DoctorUsername+"\",\""+doctor.Day+"\",\""+doctor.StartTime+
								"\",\""+doctor.EndTime+"\");' class='btn'>Schedule</button></td>"
				if(ratings.hasOwnProperty(doctor.DoctorUsername)){
					resultsTable = resultsTable + "<td>" + ratings[doctor.DoctorUsername] + "</td>";
				}else {
					resultsTable = resultsTable + "<td>N/A</td>";
				}
				resultsTable = resultsTable + "</tr>";
			};
			$("#doctable").append(resultsTable);
		});
}
function requestAppointment(doctor,day,start,end){
	$.post("../php/abhijit/requestAppointment.php",{postdoctor:doctor,
													postday:day,
													poststart:start,
													postend:end},
	function(data){
		if(data == "cannot"){
			alert("You cannot make another appointment with this doctor");
		}else if(data == "requested"){
			window.location.reload();
		}else {
			console.log(data);
		}
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


function getProfileInfo(){
	$.get("../php/joey/getPatientProfile.php",{},
		function(data){
			data = $.parseJSON(data);
			
				var profile = data.profile;
				var allergies = data.allergies;
				$('#fname').empty();
				$('#fname').val(profile.FirstName);
				
				$('#lname').empty();
				$('#lname').val(profile.LastName);
				
				$('#DOB').empty();
				$('#DOB').val(profile.DOB);
				
				$('#address').empty();
				$('#address').val(profile.Address);
				
				var dd = document.getElementById('gender');
				for (var i = 0; i < dd.options.length; i++) {
					if (dd.options[i].value === profile.Gender) {
						dd.selectedIndex = i;
						break;
					}
				}
				
				$('#homephone').empty();
				$('#homephone').val(profile.HomePhone);
				
				$('#workphone').empty();
				$('#workphone').val(profile.WorkPhone);
				
				$('#emergency_name').empty();
				$('#emergency_name').val(profile.EmergencyContactName);
				
				$('#emergency_phone').empty();
				$('#emergency_phone').val(profile.EmergencyContactPhone);
				
				$('#weight').empty();
				$('#weight').val(profile.Weight);
				
				$('#height').empty();
				$('#height').val(profile.Height);
				
				$('#income').empty();
				$('#income').val(profile.AnnualIncome);
				
				$('#allergies').empty();
				for(i=0;i<allergies.length;i++){
					a = allergies[i];
					if (i == (allergies.length - 1)) $('#allergies').append(a);
					else $('#allergies').append(a + ",");
				}
		});
}

function updatePatient(){
	var fname = $('#fname').val();
	var lname = $('#lname').val();
	var dob = $('#DOB').val();
	var gender = $('#gender').val();
	var address = $('#address').val();
	var homephone = $('#homephone').val();
	var workphone = $('#workphone').val();
	var emergency_name = $('#emergency_name').val();
	var emergency_phone = $('#emergency_phone').val();
	var weight = $('#weight').val();
	var height = $('#height').val();
	var income = $('#income').val();
	var allergies = $('#allergies').val();
	$.post('../php/joey/updatePatientProfile.php',{postfname:fname, 
											postlname:lname,
											postdob:dob,
											postgender:gender,
											postaddress:address,
											posthomephone:homephone,
											postworkphone:workphone,
											postemergency_name:emergency_name,
											postemergency_phone:emergency_phone,
											postweight:weight,
											postheight:height,
											postincome:income,
											postallergies:allergies},
			function(data){
				if(data == "success"){
					window.location = "patientDashboard.html";
				}else {
					$('#result3').html(data);
				}
			});
}


function loadVisits(){
	$.get("../php/abhijit/getVisitHistory.php",{},
		function(data){
			data = $.parseJSON(data);
			var resultsTable = "";
			for(i=0;i<data.length;i++){
				visit = data[i];
				resultsTable += "<tr>";
				resultsTable += "<td onclick='getVisitInfo(\"" + visit.Date + "\",\"" + visit.DoctorUsername +
								"\")'>" + visit.Date + "</td>";
				resultsTable += "</tr>";
			}
			$('#visittable').append(resultsTable);
			
		});
}
function getVisitInfo(date,doctor){
	$.get("../php/abhijit/getVisitInfo.php",{getdoctor:doctor,getdate:date},
		function(data){
			data = $.parseJSON(data);
			var visitInfo = data.visitInfo;
			var medicines = data.medicines;
			var diagnosis = data.diagnosis;
			$('#doctorName').empty();
			$('#doctorName').append("Dr. " + visitInfo.FirstName + " " + visitInfo.LastName);

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

function loadVisits(){
	$.get("../php/abhijit/getVisitHistory.php",{},
		function(data){
			data = $.parseJSON(data);
			var resultsTable = "";
			for(i=0;i<data.length;i++){
				visit = data[i];
				resultsTable += "<tr>";
				resultsTable += "<td onclick='getVisitInfo(\"" + visit.Date + "\",\"" + visit.DoctorUsername +
								"\")'>" + visit.Date + "</td>";
				resultsTable += "</tr>";
			}
			$('#visittable').append(resultsTable);
			
		});
}

function getPatientInbox(){

	$.get("../php/joey/getDoctorToPatientMessages.php",{},
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
				resultsTable += "<td onclick='openPatientInboxMessage(\"" + message.DateTime + "\",\"" + message.DoctorUsername + "\"," +
								"\""+ message.FirstName + "\"," +
								"\""+ message.LastName + "\"," +
								"\""+ message.Content + "\"," +
								"\""+ message.Status +
								
								"\")'>" + message.Status + "</td>" +
								"<td onclick='openPatientInboxMessage(\"" + message.DateTime + "\",\"" + message.DoctorUsername + "\"," +
								"\""+ message.FirstName + "\"," +
								"\""+ message.LastName + "\"," +
								"\""+ message.Content + "\"," +
								"\""+ message.Status +
								
								"\")'> Dr. " + message.FirstName + " " + message.LastName + "</td>" +
								"<td onclick='openPatientInboxMessage(\"" + message.DateTime + "\",\"" + message.DoctorUsername + "\"," +
								"\""+ message.FirstName + "\"," +
								"\""+ message.LastName + "\"," +
								"\""+ message.Content + "\"," +
								"\""+ message.Status +
								
								"\")'>" + message.DateTime + "</td>";
				resultsTable += "</tr>";
			}
			if (data.length == 0) alert("You have no messages at this time");
			else {
				$('#patientInboxMessages').empty();
				$('#patientInboxMessages').append(resultsTable);
				$('#patientInbox').modal('show');
			}
			
			
		});
}
function openPatientInboxMessage(date, doctor, firstname, lastname, content, status) {

	$('#patientInbox').modal('hide');

	$.post("../php/joey/setDtoPRead.php",{postdoctorusername:doctor,postdate:date},
		function(data){
		
			
			$('#pidoctorname').empty();
			$('#pidoctorname').append("Dr. " + firstname + " " + lastname);
		
			$('#picontent').empty();
			$('#picontent').append(content);

			$('#pidatetime').empty();
			$('#pidatetime').append(date);
			
			$('#pistatus').empty();
			$('#pistatus').append(status);
			
			$('#patientMessage').modal('show');
			
			
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
										onclick: "openSendMessageModal('"+ data[i].name+"','"+data[i].username+"');"
									})
								)
							)
						);
			}
			$('#doctorMessageList').modal('show');	
		});
}
function openSendMessageModal(name,username){

	$('#p2ddocname').val(name);
	$('#p2ddocname').attr('data-dmusername',username);
	$('#doctorMessageList').modal('hide');
	$('#sendMessage').modal('show');
}

function sendP2DMessage() {
var messageContent = $('#p2dcontent').val();
var doctorUserName = $('#p2ddocname').attr('data-dmusername');

	$.post('../php/joey/sendPtoDMessage.php',{
		postdoctorusername:doctorUserName,
		postcontent:messageContent,
		
	},function(data){
		if(data == "success")
			window.location.reload();
	});
}

function loadUnreadMessages() {
	$.get("../php/joey/getUnreadMessagesPatient.php",{},
		function(data){
			if (data != 1) document.getElementById("newMessages").innerHTML="You have " + data + " unread messages";
			else if (data == 1) document.getElementById("newMessages").innerHTML="You have " + data + " unread message";
		});


}

function selectDoctor(func){
	$.get('../php/abhijit/getDoctors.php',{},
		function(data){
			data = $.parseJSON(data);
			$('#docTable').empty();
			$('#docTable')
				.append($('<tr>')
					.append($('<td>',{text:'Doctor Name'})));
			for(var i=0;i<data.length;i++){
				$('#docTable')
					.append($('<tr>')
						.append($('<td>')
							.append($('<a>',{
										text:data[i].name,
									}).on("click",{name:data[i].name,username:data[i].username},func)
								)
							)
						);
			}
			$('#docList').modal('show');
		});
}
function setDoctor(event){
	$('#doctor').val(event.data.name);
	$('#doctor').attr('data-dusername',event.data.username);
	$('#docList').modal('hide');
}
function setDoctorToRate(event){
	$('#ratingDoctorName').val(event.data.name);
	$('#ratingDoctorName').attr('data-duser',event.data.username)
	$('#docList').modal('hide');
}

function rateDoctor(){
	var doctorUsername = $('#ratingDoctorName').attr('data-duser');
	var rating = $('#rating').val();
	console.log(doctorUsername + " "+ rating);
	$.post('../php/abhijit/rateDoctor.php',{
		postDoctorUsername:doctorUsername,
		postRating:rating
	},function(data){
		console.log(data);
		if(data=="success"){
			alert('Rating Successful!');
			window.location.reload();
		}else
			$('#ratingResult').append(data);
	});
}
function selectMedicine(){
	$.get('../php/abhijit/getMedicines.php',{},
		function(data){
			data = $.parseJSON(data);
			$('#medicineTable').empty();
			$('#medicineTable')
				.append($('<tr>')
					.append($('<td>',{text:'Medicine Name'})));
			for(var i=0;i<data.length;i++){
				$('#medicineTable')
					.append($('<tr>')
						.append($('<td>')
							.append($('<a>',{
										text:data[i],
										onclick: "setMedicineName('"+ data[i]+"');"
									})
								)
							)
						);
			}
			$('#medicineList').modal('show');
		});
}
function setMedicineName(name){
	$('#medicine_name').val(name);
	$('#medicineList').modal('hide');
}

function addToBasket(){
	var medicineName = $('#medicine_name').val();
	var dosage = $('#dosage').val();
	var duration = $('#duration').val();
	var doctorUserName = $('#doctor').attr('data-dusername');
	var visitDate = $('#prescription_date').val();

	$.post('../php/abhijit/addToBasket.php',{
		postMedicineName:medicineName,
		postDosage:dosage,
		postDuration:duration,
		postDoctorUsername:doctorUserName,
		postVisitDate:visitDate
	},function(data){
		if(data == "success"){
			window.location.reload();
		}else {
			$('#result').empty();
			$('#result').append(data);
		}
	});
}
function checkout(){
	var medicineName = $('#medicine_name').val();
	var dosage = $('#dosage').val();
	var duration = $('#duration').val();
	var doctorUserName = $('#doctor').attr('data-dusername');
	var visitDate = $('#prescription_date').val();

	$.post('../php/abhijit/addToBasket.php',{
		postMedicineName:medicineName,
		postDosage:dosage,
		postDuration:duration,
		postDoctorUsername:doctorUserName,
		postVisitDate:visitDate
	},function(data){
		if(data == "success"){
			$('#payment').modal('show');
			$('#paymentResult').empty();
		}else {
			$('#result').empty();
			$('#result').append(data);
		}
	});
}
function getPaymentInfo(){
	$.get('../php/abhijit/getCardInfo.php',{},
		function(data){
			if(!data){
				$('#cardForm').removeClass('hidden');
			}else {
				cardDisplayText = 'Use card ending in ' + data.slice(-4);
				$('#existingCard').removeClass('hidden');
				$('#checkoutButton').addClass('hidden');
				$('#existingCard').empty();
				$('#existingCard').append($('<h4>',{
					class:'list-group-item-heading',
					text:"Use an existing card."
				}));
				$('#existingCard').append($('<a>',{
					class:'list-group-item',
					text: cardDisplayText,
					onclick: "payWithCard('"+data+"',true);"
				}));
			}
		});
}

function payWithCard(cardno,existing){
	var args = {};
	if(existing){
		args = {
			postCardNumber:cardno,
			postExistingCard:"true"
		};
	}else {
		args = {
			postCardholderFirstName: $('#cardholderFirstName').val(),
			postCardholderLastName: $('#cardholderLastName').val(),
			postCardNumber: $('#cardNumber').val(),
			postCardType: $('#cardType').val(),
			postCvvCode: $('#cvvCode').val(),
			postExpireDate: $('#cardExpireDate').val(),
			postExistingCard: "false"

		}
	}
	$.post('../php/abhijit/payment.php',args,
		function(data){
			if($('#existingCard').hasClass('hidden')){
				$('#cardForm').addClass('hidden');
				$('#checkoutButton').addClass('hidden');
			}
			else
				$('#existingCard').addClass('hidden');
			if(data == "success"){
				$('#paymentResult').append('Payment Successful!');
			}else {
				console.log(data);
				$('#paymentResult').append('Payment Unsucessful check your info and try again');
			}
		});
}
function emptyBasket(){
	$.get("../php/abhijit/emptyBasket.php",{},
		function(data){
			window.location.reload();
		});
}
$(document).ready(function () {	
	initTabView();
	loadVisits();
	getProfileInfo();
	//getMessages();
	$('#companyDetails')
		.on('change', CompanyDetails.update);
	getPaymentInfo();
	var slider = new Slider($('.SideSlider'));
	$('body').on('click', '.SideSlider', function (event) {
		event.stopPropagation();
		slider.open();
	}).on('click', function () {
		slider.close();
	});
		


	function initTabView(){
				var x = document.getElementsByClassName('tab-view');
				for(var i=0; i < x.length; i++) {
				  x[i].onclick = displayTab;
				}

				var prevViewedTab = null;

				function displayTab(e) {
				var idOfTabToDisplay = this.getAttribute("data-tab");

				if(prevViewedTab) {
				  prevViewedTab.style.display = 'none';
				}

				var tabToDisplay = document.getElementById(idOfTabToDisplay);
				  tabToDisplay.style.display = 'block';
				  prevViewedTab = tabToDisplay;
				}

				var defaultTab = document.getElementsByClassName('default-tab');
				  if (defaultTab.length) {
					defaultTab[0].style.display = 'block';
					prevViewedTab = defaultTab[0];
				  }
			  }
	});

