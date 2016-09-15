

$(document).ready(function() {

  var keyDown = 40;
  var keyUp = 38;

document.onkeydown = function(event) {
  var currKey = detectKeyCode(event);

  if (currKey == keyDown || currKey == keyUp) { // do this script only when pressing up or down buttons
    var currPage = detectCurrentPage();
    showNextPage(currPage, event);
  }

};


function showNextPage(currPage, event) {

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
  changePagesVisibility(currPage, nextPage);
  console.log(nextPage);
}

function changePagesVisibility(currPage, nextPage) {
  if ( $('.pages').size() == nextPage - 1 ) { //do not allow to scroll more than last web page (не позволяем переходить на несуществующие страницы, большие чем их есть)
    return false; //if we want to stop scrolling pages at all
    nextPage = 1; //if we want to start from first page
  }
  $('body').find('[data-id="' + currPage + '"]').slideUp('slow');
  $('body').find('[data-id="' + nextPage + '"]').slideDown('slow');
}

function detectCurrentPage() {

  var page = '';
  $('.pages').each(function(index, element) {
   
    if ($(this).css('display') == 'block') {
      page = $(this).attr('data-id');
    }
  });

  return page;
}

function detectKeyCode(event) {
  
  var keycode;
  if(!event) var event = window.event;
  if (event.keyCode) keycode = event.keyCode; // IE
  else if(event.which) keycode = event.which; // all browsers
  
  return keycode;
}


});