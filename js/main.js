function login() {
	$("#loading").show();
    var name = $('#inputEmail').val();
    var password = $('#inputPassword').val();

    $.post('php/charles/login.php', { postname: name, postpassword: password },
	function (data) {
	    if (data == "admin") {
	        window.location = 'AdminDashboard/adminDashboard.html';
	    }
	    else if (data == "patient") {
	        window.location = 'PatientDashboard/patientDashboard.html';
	    }
	    else if (data == "doctor") {
	        window.location = 'DoctorDashboard/doctorDashboard.html';
	    }
	    else {
	        $('#result').html(data);
	        $("#loading").hide();
	    }
	});
}


function register() {
    var name = $('#Text3').val();
    var doctorCheck = document.getElementById("doctor").checked;
    var patientCheck = document.getElementById("patient").checked;
    var pass1 = $('#Password1').val();
    var pass2 = $('#Password2').val();
    if (doctorCheck) {
        type = "Doctor";
    }
    else if(patientCheck){
        type = "Patient";
    }else{
    	type = "Admin";
    }
    $.post('php/charles/register.php', { postname: name, postusertype: type, postpassword1: pass1, postpassword2: pass2},
	function (data) {
	    if (data == "admin") {
	        window.location = 'AdminDashboard/adminDashboard.html';
	    }
	    else if (data == "patient") {
	    	$('#register').modal('hide');
	        $('#createPatient').modal('show');
	    }
	    else if (data == "doctor") {
	        $('#register').modal('hide');
	        $('#createDoctor').modal('show');
	    }
	    else {
	        $('#result2').html(data);
	    }
	});
}

function createPatient(){
	var fname = $('#fname').val();
	var lname = $('#lname').val();
	var dob = $('#DOB').val();
	var gender = $('#gender').val();
	var address = $('#address').val();
	var homephone = $('#homephone').val();
	var workphone = $('#workphone').val();
	if(workphone === ''){
		workphone = '0';
	}
	var emergency_name = $('#emergency_name').val();
	var emergency_phone = $('#emergency_phone').val();
	var weight = $('#weight').val();
	var height = $('#height').val();
	var income = $('#income').val();
	var allergies = $('#allergies').val();
	$.post('php/abhijit/createPatient.php',{postfname:fname, 
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
					window.location = "PatientDashboard/patientDashboard.html";
				}else {
					$('#result3').html(data);
				}
			});
}


function createDoctor(){
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
	
	$.post('php/jordan/createDoctor.php',{postlicnum:licnum,
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
					window.location = "DoctorDashboard/doctorDashboard.html";
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

jQuery(document).ready(function () {
	$("#loading").hide();
	$('#inputEmail').add('#inputPassword').on('keypress', function submitKeypress(event) {
		if (event.which == 13)
		{
			login();
		}
	});
	
	/** Scrollspy Implemented for Scroll instead of previous nasty code**/
	
	/**Parralax Functionality**/
    var $window = $(window);
    $('div[data-type="background"]').each(function(){
        var $bgobj = $(this); // assigning the object
     
        $(window).scroll(function() {
            var yPos = -($window.scrollTop() / $bgobj.data('speed')); 
             
            // Put together our final background position
            var coords = '50% '+ yPos + 'px';
 
            // Move the background
            $bgobj.css({ backgroundPosition: coords });
        }); 
    }); 
	
	/**HomeScreen/Background Dynamic Visual Settings**/
	/*Global Offsets for Visual Dynamics*/
	var heightOffset; //Offset for HomeText in relation with bottom of screen
	var homeTextHeight; //Object's Height at any given time
	
	/*Refreshes Home Page to have optimal Visual settings*/
	function refreshHomePageVisuals() {
	    //Need to loop through array of those to find highest value of height
	    var homeTextHeightArray = document.getElementsByClassName('carousel-caption');
	    homeTextHeight = 0;
	    for (var i = 0; i < homeTextHeightArray.length; i++) {
	        if ($(homeTextHeightArray[i]).height() > homeTextHeight) {
	            homeTextHeight = $(homeTextHeightArray[i]).height();
	        }
	    }

	    if ($(window).width() > 768) {
	        heightOffset = 80;
	    } else {
	        heightOffset = 80 + 10;
	    }
	    $('.carousel .item').css("height", $(window).height() + heightOffset);
	    $('.carousel .item  img').css("height", $(window).height() + heightOffset);
	    $('.carousel-caption').css("margin-bottom", ($(window).height() - homeTextHeight - 45) / 2); //45px is a minor tweak to center text...Not very noticable (I'm perfectionist)   
		$('#c1').load(function () {
			$('#backgroundImage').css("top", $(window).height());
	        $('#backgroundImage').css("height", $(document).height()-$(window).height());
		}).each(function(){
			if(this.complete){
				$(this).trigger('load');
			}
		});
		$('[data-spy="scroll"]').each(function () {
			var $spy = $(this).scrollspy('refresh')
		});	 
		
		/**Mobile Click Functionality**/
		/*OnClick in Mobile, will collapse menu*/
		if($(window).width()<861){ //861, because thats when Mobile View kicks in.
			$('#homeBtn').click(function(){
				$('#mobileMenu').click();
			});
			$('#aboutBtn').click(function(){
				$('#mobileMenu').click();
			});
			$('#faqBtn').click(function(){
				$('#mobileMenu').click();
			});
			$('#contactBtn').click(function(){
				$('#mobileMenu').click();
			});
		}else{
			$('#homeBtn').unbind();
			$('#aboutBtn').unbind();
			$('#faqBtn').unbind();
			$('#contactBtn').unbind();
		}
	}
	/*Loads optimal home visuals when User first opens site*/
	refreshHomePageVisuals();
		
	/*Loads optimal home visuals when User Resize/Zoom*/
    $(window).resize(function (){ 
		refreshHomePageVisuals();
	});
	var cachceBugFix = setInterval(function() {
		var goalHeight = $(document).height()-$(window).height();
		if ($('#backgroundImage').height() < goalHeight-5 || $('#backgroundImage').height() > goalHeight+5 ) {
			refreshHomePageVisuals();
		}
	}, 250);
	
	/**Removes Loading Screen***/
	/* Comment: This is essential to get rid of "flickers" on initial load. This
	* guarantees everything is loaded to visual perfection, THEN allows user to see.*/
	//NOT FUCKING WORKING - FIX LATER - THIS PIECE OF SHIT JQUERY's LOAD FCKING BULL SHIT
	// http://mike-donaldson.com/tips-and-tricks/jquery-load-event-not-firing-on-images/
	$('#c1').load(function () {
		$('#loadingScreen').hide();
	}).each(function(){
		if(this.complete){
			$(this).trigger('load');
		}
	});	
	//alert($(window).height());
	//alert($(window).width());
	//alert($(document).height());
	//alert($(document).width());
	
	// load company information
	
});