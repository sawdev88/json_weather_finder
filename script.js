var
    userInput,
    $welcome = $('.welcome'),
    $main = $('.main-content'),
    $searchText = $('.search-text'),
    $searchButton = $('.search-button'),
    $cityName = $('.city-name'),
    key = '22e0a3505a1754a4f9b38c2fe79e22c2';

$(function() {

  //Show and hde welcome
  $welcome.delay(300).fadeIn().delay(800).fadeOut().hide();

  //Show Main Content
  $main.delay(2000).fadeIn(800);
  
  $searchButton.on('click', function() {
    userInput = $searchText.val();

    $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + userInput + '&APPID=' + key, function(json) {

      if (json.message === 'Error: Not found city') {
        $cityName.text("ERROR: Please enter valid city");
      } else {
        console.log(json);
        $cityName.text(json.name);
      }s

    });
  });
})
