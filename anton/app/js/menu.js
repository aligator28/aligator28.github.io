$( document ).ready(function() {
	var menu = $('.nav-mnu'); 
	var lines = $('.switch');
	var header = $('.bcg_head');
	var heightMenu = header.height();
	var widthMenu = header.width();

	//добавлен айдишник для дива, являющегося контейнером для меню
	var navCont = $('#nav_container');


	if(header.width() < 1200 ) {
		console.log( menu.height() );
		menu.height(heightMenu);
		menu.width(widthMenu);

		//при загрузке контейнеру меню делаем такое свойство, чтобы скрыть непонятное поведение абсолютно позиционированого меню, которое раздвигает страницу
		navCont.css({'overflow': 'hidden'});
	}

	$('#menu_switcher').click(function(){
		if(menu.css("opacity") == "1") {
			menu.css({
				'opacity':'0',
				'right':'-100%'
			});
			//когда меню видно, нужно немножко подождать, пока отыграет медленное уплывание и затухание меню, а только потом делать хидден для контейнера меню
			setTimeout( function() {
				navCont.css({'overflow': 'hidden'});
			}, 500);

			lines.removeClass('sw_closed');
		}
		else {
			menu.css({
				'opacity':'1',
				'right':'0'
			});

			//при появлении меню делаем для контейнера визибл
			navCont.css({'overflow': 'visible'});
			
			lines.addClass('sw_closed');
		}
	});


	// smooth scrolling (в IE не працюе, але можна виришити, просто треба бильше часу)
	$('.nav-mnu li a').click(function(event) {
		event.preventDefault();//забороняем виконувати будь-яку дефолтну дию

		var idTo = $(this).attr('href'); //зчитуемо атрибут ссылки, яка е якорем
		// Scroll to a certain element
		document.querySelector(idTo).scrollIntoView({ 
		  behavior: 'smooth' 
		});
	});
});