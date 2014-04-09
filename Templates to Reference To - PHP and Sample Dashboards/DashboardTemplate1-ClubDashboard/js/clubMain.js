function showUploadImage(){
	$("#file").show('slow');
	$("#submit").show('slow');
}

function hideUploadImage(){
	setTimeout(function(){
		$("#file").hide('slow');
		$("#submit").hide('slow');
	}, 2000);	
}

var packageToEdit = {
	obj: null,
	id: -1,
	name: "",
	details: "",
	price: ""
};
var canEdit = false;
function packageEditorClick()
{
	if (canEdit)
	{
		edit();
	}
	else
	{
		submit();
	}
}

function edit()
{
	var packageName = $('#packageName').val();
	var price = Number($('#price').val());
	var details = $('#details').val();
	
	packageToEdit.obj.find('.packageName').html(packageName);
	packageToEdit.obj.find('.packageDetails').html(details);
	packageToEdit.obj.find('.packagePrice').html('$' + price);
	
	var post = {
		postId: packageToEdit.id,
		postPackageName: packageName,
		postPrice: price,
		postDetails: details
	};
	
	$.post('../php/editPackage.php', post);
	$('#submitPackage').modal('hide');
}

//add a package to database when click the submit button
function submit() {
	var packageName = $('#packageName').val();
	var price = $('#price').val();
	var details = $('#details').val();
	$.post('../php/addPackage.php',
		{ postPackageName: packageName, postPrice: price, postDetails: details },
		function (data) {
		    window.location.reload();
		});
}

function addClick()
{
	canEdit = false;
	$('#packageName').val("");
	$('#price').val("");
	$('#details').val("");
}

//logout from the club page
function logout() {
	var r = confirm("Do you really want to log out?");
	if (r) {
		window.location.href = '../php/logout.php'
	}
}


var ClubDetails = {
	update: function() {
		var details = ClubDetails.get();
		$.post('../php/updateClubDetails.php', details);
	},
	get: function() {
		var clubName = $('#ClubName').children('input').val();
		var clubMembers = parseInt($('#ClubMembers > input').val());
		var schoolName = $('#SchoolName > input').val();
		var clubDetails = $('#ClubDetails').val();
		var emailAddress = $('#EmailAddress').val();
		
		var details = {
			postClubName: clubName,
			postClubMembers: clubMembers,
			postSchoolName: schoolName,
			postClubDetails: clubDetails,
			postEmailAddress: emailAddress
		};
		return details;
	}
}

var ClubPackages = {
	getPackageString: function (id, name, price, details) {
		return "<div class=\"activePackage\" data-id=\"" + id + "\"> \
			<div class=\"panel panel-success panel-default\"> \
				<div class=\"panel-heading panel-success\"> \
					<h3 class=\"panel-title\"> \
						<span class=\"packageName\"> " + name + "</span> \
						<span class=\"pull-right\"> \
							<span class=\"glyphicon glyphicon-edit\"></span> "+"&nbsp"+"\
							<span class=\"glyphicon glyphicon-trash\"></span> \
						</span> \
					</h3> \
				</div> \
				<div class=\"panel-body\"> \
					<div class=\"\"> \
						<blockquote class=\"pull-left text-muted\"><small class=\"packageDetails\">" + details + " </small></blockquote> \
						<a class=\"pull-right packagePrice\"> $" + price + "</a> \
					</div> \
				</div> \
			</div> \
		</div>";
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
	"Click on the big green button to add a package.",
	"Click on any piece of club information in order to change that piece of information.",
	"Click on package information in order to change it.",
	"Click on the trashcan icon in order to delete a package.  Packages that have already been sponsored cannot be deleted."
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
	loadClubPackages();
	loadClubDetails();

	$('#ClubInformation').on('change', '.details', ClubDetails.update);
	
	var slider = new Slider($('.SideSlider'));
	$('body').on('click', '.SideSlider', function hintSliderOpen(event) {
		event.stopPropagation();
		slider.open();
	}).on('click', function hintSliderClose() {
		slider.close();
	});
	
	$('#packages').on('click', 'span.glyphicon-edit', function openEditMenu() {
		var $package = $(this);
		while (!$package.hasClass('activePackage'))
		{
			$package = $package.parent();
		}
		setPackageDetails($package);
		canEdit = true;
		$('#submitPackage').modal('show');
		
		$('#packageName').val(packageToEdit.name);
		$('#price').val(packageToEdit.price);
		$('#details').val(packageToEdit.details);
	});
	
	$('#packages').on('click', 'span.glyphicon-trash', function deletePackage() {
		if (confirm("Are you sure you want to delete this package?"))
		{
			var $package = $(this);
			while (!$package.hasClass('activePackage'))
			{
				$package = $package.parent();
			}
			setPackageDetails($package);
			
			var post = { id: packageToEdit.id };
			$.post('../php/deletePackage.php', post, function postDeletePackage(data) {
				$package.remove();
			});
		}
	});
	
	function setPackageDetails($package)
	{
		var id = $package.data('id');
		var name = $package.find('.packageName').html();
		var details = $package.find('.packageDetails').html();
		var price = $package.find('.packagePrice').html();
		price = price.replace(/\$/gi,""); 
		price = price.replace(/,/gi,"");

		packageToEdit.obj = $package;
		packageToEdit.id = id;
		packageToEdit.name = name;
		packageToEdit.details = details;
		packageToEdit.price = Number(price);
	}

	function loadClubPackages() {
		$.getJSON("../php/getPackagesByClub.php", function (data) {
			var packageId, packageName, packagePrice, clubPackagesSize;
			clubPackagesSize = data.packages.length;
			for (var i = 0; i < clubPackagesSize; i++) {
				packageId = data.packages[i].packageId;
				packageName = data.packages[i].packageName;
				packagePrice = data.packages[i].packagePrice;
				packageDetails = data.packages[i].packageDetails;
			    $("#packages").prepend(ClubPackages.getPackageString(packageId, packageName, packagePrice, packageDetails));
			}
		});
	}

	function loadClubDetails() {
		$.getJSON("../php/getClub.php", function (data) {

			var clubName = data.clubDetails[0].clubName;
			var emailAddress = data.clubDetails[0].emailAddress;
			var numberOfMembers = data.clubDetails[0].numberOfMembers;
			var schoolName = data.clubDetails[0].schoolName;
			var clubDescription = data.clubDetails[0].clubDescription;
			var imageLocation = data.clubDetails[0].imageLocation;

			$("#ClubName").children('input').val(clubName);
			$("#ClubMembers > input").val(numberOfMembers);
			
			$("#SchoolName").children('input').val(schoolName);
			$("#ClubDetails").val(clubDescription);
			$("#clubPic").attr("src", imageLocation);
			$("#EmailAddress").val(emailAddress);

		});
	}

});
