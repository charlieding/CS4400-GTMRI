function logout(){
	var r = confirm("Do you really want to log out?");
	if (r) {
	   window.location.href = '../php/logout.php'
	}
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

