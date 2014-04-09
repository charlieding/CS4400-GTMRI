function login() {
    var name = $('#inputEmail').val();
    var password = $('#inputPassword').val();

    $.post('php/login.php', { postname: name, postpassword: password },
	function (data) {
	    if (data == "company") {
	        window.location = 'CompanyDashboard/companyPage.html';
	    }
	    else if (data == "organization") {
	        window.location = 'ClubDashboard/clubPage.html';
	    }
	    else {
	        $('#result').html(data);
	    }
	});
}


function register() {
    var name = $('#Text3').val();
    var organizationName = $('#Text2').val();
    var email = $('#Text1').val();
    var check = document.getElementById("blue").checked;
    var pass1 = $('#Password1').val();
    var pass2 = $('#Password2').val();
    if (check) {
        type = "Organization";
    }
    else {
        type = "Company";
    }
    $.post('php/register.php', { postname: name, postOrg: organizationName, postemail: email, postusertype: type, postpassword1: pass1, postpassword2: pass2 },
	function (data) {
	    if (data == "company") {
	        window.location = 'CompanyDashboard/companyPage.html';
	    }
	    else if (data == "organization") {
	        window.location = 'ClubDashboard/clubPage.html';
	    }
	    else {
	        $('#result').html(data);
	    }
	});
}

jQuery(document).ready(function () {

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