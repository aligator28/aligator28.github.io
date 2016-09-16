	var keyUp = 38;
	var keyDown = 40;
	var page = 1;


$(document).ready(function() {


	hideLoader();

	$.getJSON('js/pages.json', function(data) {
		

		showPage(data, page);//
		

		document.onkeydown = function(event) {

			var currKey = detectKeyCode(event);

	  		if (currKey == keyDown || currKey == keyUp) { // do this script only when pressing up or down buttons
	
				var length = 1;
				for (var key in data)  
					length++; 
				if (page < length) 
					page = nextPage(page, event);
				if (page >= length) 
					page = 1;

				showPage(data, page);
	  		}
	  	};
	});
});

function showPage(data, page) {
	$('#content').fadeTo( 'fast', .5, loadPage(data, page) );
	$('#load').fadeIn('normal');
}

function nextPage (currPage, event) {

	var nextPage = 1;
	var currKey = detectKeyCode(event);

	if (currKey == keyDown) {
		nextPage = parseInt(currPage) + 1;
	}

	if (currKey == keyUp) {
		if (currPage == 1) {
			nextPage = 1;
		}
		else {
			nextPage = parseInt(currPage) - 1;
		}
	}
	return nextPage;
}

function detectKeyCode(event) {

	var keycode;
	if(!event) var event = window.event;
	if (event.keyCode) keycode = event.keyCode; // IE
	else if(event.which) keycode = event.which; // all browsers
  
	return keycode;
}

//////////////////////// AJAX //////////////////////

function loadPage(data, page) {
	$.each(data, function(key, href) {
		if (page == key) {
			$('#content').load(href, '', showNewContent);
		}
	});
}

function showNewContent() {
	$('#content').fadeTo('fast', 1, hideLoader());
}

function hideLoader() {
	$('#load').fadeOut('normal');
}




// $(document).ready(function() {

	// var hash = window.location.hash.substr(1);

	// var href = $('#nav li a').each( function() {
	// 	var href = $(this).attr('href');
	// 	if( hash == href.substr(0,href.length-5) ) {
	// 		var toLoad = hash+'.html #content';
	// 		$('#content').load(toLoad)
	// 	}											
	// });

	// $('#nav li a').click(function(){

	// 	var toLoad = $(this).attr('href') + ' #content';
	// 	$('#content').hide('fast', loadContent);
	// 	$('#load').remove();
	// 	$('#wrapper').append('<span id="load">LOADING...</span>');
	// 	$('#load').fadeIn('normal');

	// 	window.location.hash = $(this).attr('href').substr(0,$(this).attr('href').length-5);
		
	// 	function loadContent() {
	// 		$('#content').load(toLoad,'',showNewContent())
	// 	}
	// 	function showNewContent() {
	// 		$('#content').show('normal', hideLoader());
	// 	}
	// 	function hideLoader() {
	// 		$('#load').fadeOut('normal');
	// 	}
	// 	return false;
		
	// });

// });