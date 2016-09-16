$(function() {

	// datepicker
	var picker = new Pikaday({
		field: document.getElementById('datepicker'),
		i18n: {
		    previousMonth : 'предыдущий месяц',
		    nextMonth     : 'следующий месяц',
		    months        : ['Январь','Февраль','Март','Апрель','Май','Июнь','July','August','September','October','November','December'],
		    weekdays      : ['Воскресенье','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
		    weekdaysShort : ['Вс','Пн','Вт','Ср','Чт','Пт','Сб']
		},
		onSelect: function(date) {
		    var year = date.getFullYear(),
		    	month = date.getMonth() + 1,
		       day = date.getDate(),
		       formattedDate = [
		         day < 10 ? "0" + day : day,
		         month < 10 ? "0" + month : month,
		          year
		        ].join("/")
		    document.getElementById("datepicker").value = formattedDate
		},
		defaultDate: "00/00/2016"
	});

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};
	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("#sing-in-form").submit(function() { //Change
		console.log('form');
		return false;
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

});
