var key = '22e0a3505a1754a4f9b38c2fe79e22c2';

$(function() {

  $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=denver&APPID=' + key, function(json) {

    if (json.message === 'Error: Not found city') {
      console.log('error');
    } else {
      console.log('woked');
      console.log(json);
    }

  });

})
