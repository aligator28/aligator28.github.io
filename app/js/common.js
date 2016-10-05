$(function() {

	// navigation (using ajax loading)
	loadPages('home');
	// show footer after page loaded
	loadFooter();

	$(document).on('click', '#menu-container a', function(e) {

		$(this).addClass('active');
		
		// just highlight current item of main menu
		var currPageId = $(this).attr('id');
		$('#menu-container a').each(function(index, el) {
			if (currPageId != el.id) {
				$(this).removeClass('active');
			}
		});

		$('footer').css('display', 'none');
		
		e.stopPropagation();
		e.preventDefault();
		
		var page = $(this).attr('href');
		loadPages(page);
		loadFooter();

	});

	// enable back and forward buttons in browser for navigation
	$(window).bind('popstate', function() {
		var str = location.pathname;
		var symbol = str.lastIndexOf("/");
		var page = str.substring(symbol + 1, str.length);

		// console.log(page);
		loadPages(page);
	});//bind ends




	$(document).on('load', '.flexslider', function () {
		$('.flexslider').flexslider({
			animation: "slide"
		});
	});


	// submit on book a cab form on home page
	$(document).on('click', '#done-btn', function(event) {
		validateAddress( $('#book-form'), $('#address'), event );
	});




	// call us dropdown
	$('#selected-city').on('click', function() {
		$('#cities-list').slideDown('slow');
	});
	$('#cities-list li').on('click', function() {
		$('#selected-city span').text( $(this).text() );
		$('#phone-number').text($(this).attr('data-num'));

		$('#cities-list').slideUp('slow');
	});


	// navigation
	$('#menu').on('click', function(event) {
		event.preventDefault();
		$('.menu-container').slideToggle('slow');
	});
	// // $('.nav-items').on('click', function(event) {
	// 	// console.log('hi');
	// 	event.preventDefault();
	// 	/* Act on the event */
	// 	$('.menu-container').slideUp('slow');
	// });

	// search
	$('#search-btn').on('click', function() {
		$('#search-form').slideDown();
	});
	$('#search-submit').on('click', function() {
		$('#search-form').slideUp();
	});






	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};


	// map on home page
	$(document).on('click', '#map-btn', function(e) {
		showMap( $('#map-modal'), $('#map-container'), $('#location'), e );
	});

	$(document).on('click', '#loc-sbmt', function(event) {
		event.preventDefault();
		$('#map-modal').hide('slow');
		$('#address').val( $('#location').val() );
	});

	$(document).on('click', '#loc-close', function(event) {
		event.preventDefault();
		$('#map-modal').hide('slow');
	});




	// maps for booking page
	// from address
	$(document).on('click', '#map-btn-from', function(e) {
		showMap( $('#from-map-modal'), $('#from-map-container'), $('#from-location'), e );
	});
	$(document).on('click', '#from-submit', function(event) {
		event.preventDefault();
		$('#from-map-modal').hide('slow');
		$('#address-from').val( $('#from-location').val() );
	});

	// to address
	$(document).on('click', '#map-btn-to', function(e) {
		showMap( $('#to-map-modal'), $('#to-map-container'), $('#to-location'), e );
	});
	$(document).on('click', '#to-submit', function(event) {
		event.preventDefault();
		$('#to-map-modal').hide('slow');
		$('#address-to').val( $('#to-location').val() );
	});

});



function showMap(modal, mapContainer, locationInput, event) {
	// console.log(mapContainer.attr('id'));

	event.preventDefault();

	//google map
	mapContainer.locationpicker({
		location: {
			latitude: 49.588267,
			longitude: 34.551417
		},
		radius: 10,
		inputBinding: {
			locationNameInput: locationInput
		},
		enableAutocomplete: true,
		markerIcon: '../img/map-icon.png'
	});		

	modal.show('slow');
	mapContainer.locationpicker('autosize');
}

function loadPages(page) {

	var stylePage = 'css/' + page + '.min.css';
	var currPage = 'pages/' + page + '.html';
	
	$('head').append('<link rel="stylesheet" type="text/css" href="' + stylePage + '">');
	
	$('#content').load(currPage, function() {

		if (page == 'home') {
			$('.flexslider').flexslider({
				animation: "slide"
			});
		}
		if (page == 'booking') { //load datepicker only on booking page
			var picker = new Pikaday({ field: $('#datetime')[0] });
			validateBooking();
		}
	});//load ends


	// use historyApi (display current page in address line)
	if (page != window.location){
		window.history.pushState(null, null, page);
	}
}

function loadFooter() {
	$('footer').delay('3000').slideDown('slow');
}

function validateAddress(form, addressParagraph, event) {
	var checked = true;
	if( addressParagraph.val() == '' ) {
		$('#errors').text('Choose an address, please');
		checked = false;
	}
	if( form.find('input[name="type"]:checked').length < 1 ) {
		$('#errors').text('Choose Type, please');
		checked = false;
	}
	if (checked === false) {
		$('#errors').show('slow');
		// event.preventDefault();
	}

	if(checked === true) {
		$('#errors').hide('slow');
		form.submit();
	}
}

function validateBooking() {
		var script = document.createElement('script');
		script.src = 'http://cdn.jsdelivr.net/jquery.validation/1.15.1/jquery.validate.min.js';
		script.onload = function () {

			$("#form-book-a-cab").validate({
				// Specify validation rules
				rules: {
					// The key name on the left side is the name attribute
					// of an input field. Validation rules are defined
					// on the right side
					name: "required",
					phone: "required",
					type: "required",
					adults: "required",
					from_address: "required",
					to_address: "required"
				},
					// Specify validation error messages
					messages: {
					name: "Please enter your Name",
					phone: "Please enter your Phone",
					type: "Click Type (Personal, Budget, Airport or Truck)",
					adults: "Enter number of Adulst",
					from_address: "Enter Address From",
					to_address: "Enter Address To"
				},

				errorPlacement: function(error, element) {
					if ( element.is(":radio") ) {
					    error.appendTo( $('#booking-errors') );
					} 
					else { // This is the default behavior 
					    error.insertAfter( element );
						}
					},	
					// errorLabelContainer: '#booking-errors',
					// Make sure the form is submitted to the destination defined
					// in the "action" attribute of the form when valid
					submitHandler: function(form) {
					form.submit();
				}
			});	
		};
		document.head.appendChild(script); //or something of the likes
}