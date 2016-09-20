function moveLines() {

	buildLine('gray2', 'left');
	animateLeftLines($('#gray2'), '65%', '700px', .3, 200, 800);
	buildLine('red', 'left');
	animateLeftLines($('#red'), '85%', '250px', 1, 500, 1300);
	buildLine('gray', 'left');
	animateLeftLines($('#gray'), '90%', '150px', 1, 1300, 1000);

	buildLine('red2', 'right');
	animateRightLines($('#red2'), '60%', '60%', .7, 1000, 1000);
	buildLine('black', 'right');
	animateRightLines($('#black'), '70%', '50px', 1, 0, 800);
	animateRightLines($('#black'), '90%', '250px', 1, 0, 500);
	buildLine('white', 'right');
	animateRightLines($('#white'), '91%', '50px', 1, 300, 1500);

	//remove lines
	animateLeftLines($('#red'), '-250px', '250px', 0, 400, 1000);
	animateLeftLines($('#gray2'), '-100px', '50px', 0, 2000, 1000);
	animateLeftLines($('#gray'), '-50px', '500px', 0, 200, 2400);
	
	animateRightLines($('#black'), '-150px', '150px', 0, 2500, 1200);
	animateRightLines($('#white'), '-50px', '700px', 0, 2000, 1500);
	animateLeftLines($('#red2'), '-850px', '850px', .7, 1000, 2000);

}

function car() {
	$('#lines-container').append('<div class="car" id="car"></div>');
}

function animateLeftLines(elem, pos, width, opa, del, dur) {

	elem.delay(del).animate({
		left: pos,
		width: width,
		opacity: opa
		},
		dur, 'swing' );

}

function animateRightLines(elem, pos, width, opa, del, dur) {

	elem.delay(del).animate({
		right: pos,
		width: width,
		opacity: opa
		},
		dur, 'swing' );

}

function buildLine(color, side) {
	$('#lines-container').append('<div class="lines ' + color + ' ' + side + '" id="' + color +'"></div>');
}
