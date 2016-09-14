$(document).ready(function(){

/* Переменная-флаг для отслеживания того, происходит ли в данный момент ajax-запрос. В самом начале даем ей значение false, т.е. запрос не в процессе выполнения */
var inProgress = false;
/* С какой статьи надо делать выборку из базы при ajax-запросе */
var startFrom = 10;

    /* Используйте вариант $('#more').click(function() для того, чтобы дать пользователю возможность управлять процессом, кликая по кнопке "Дальше" под блоком статей (см. файл index.php) */
    $(window).scroll(function() {

        /* Если высота окна + высота прокрутки больше или равны высоте всего документа и ajax-запрос в настоящий момент не выполняется, то запускаем ajax-запрос */
        if($(window).scrollTop() + $(window).height() >= $(document).height() - 200 && !inProgress) {

        $.ajax({
            /* адрес файла-обработчика запроса */
            url: 'obrabotchik.php',
            /* метод отправки данных */
            method: 'POST',
            /* данные, которые мы передаем в файл-обработчик */
            data: {"startFrom" : startFrom},
            /* что нужно сделать до отправки запрса */
            beforeSend: function() {
            /* меняем значение флага на true, т.е. запрос сейчас в процессе выполнения */
            inProgress = true;}
            /* что нужно сделать по факту выполнения запроса */
            }).done(function(data){

            /* Преобразуем результат, пришедший от обработчика - преобразуем json-строку обратно в массив */
            data = jQuery.parseJSON(data);

            /* Если массив не пуст (т.е. статьи там есть) */
            if (data.length > 0) {

            /* Делаем проход по каждому результату, оказвашемуся в массиве,
            где в index попадает индекс текущего элемента массива, а в data - сама статья */
            $.each(data, function(index, data){

            /* Отбираем по идентификатору блок со статьями и дозаполняем его новыми данными */
            $("#articles").append("<p><b>" + data.title + "</b><br />" + data.text + "</p>");
            });

            /* По факту окончания запроса снова меняем значение флага на false */
            inProgress = false;
            // Увеличиваем на 10 порядковый номер статьи, с которой надо начинать выборку из базы
            startFrom += 10;
            }});
        }
    });
});




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
