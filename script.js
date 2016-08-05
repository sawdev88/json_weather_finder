var
  colors = ['#92bcff', '#d692ff', '	#ffd692', '	#ffa092'],
  userInput,
  lat,
  long,
  $welcome = $('.welcome'),
  $main = $('.main-content'),
  $searchText = $('.search-text'),
  $searchButton = $('.search-button'),
  $cityName = $('.city-name'),
  key = '22e0a3505a1754a4f9b38c2fe79e22c2';

function randomColor(arr) {
  var randomNumber = Math.floor(Math.random() * arr.length);
  return arr[randomNumber];
}

function preventEnter() {
  $(window).keydown(function(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  });
}

function round(item) {
  return Math.round(item);
}

function animateTop(item) {
  $main.animate({
    top: String(item)
  });
}

function setData(json) {

  if (json.message === 'Error: Not found city') {

    $('.validator').fadeIn('slow').delay(700).fadeOut();

  } else {

    $('.hero i').hide().css('color', randomColor(colors)).fadeIn(1000);

    if ($(window).width() > 480) {
      animateTop(120);
    } else {
      animateTop(8);
    }

    $('.search-container').hide().fadeIn();
    $cityName.text(json.name);
    $('.weather-desc').text(json.weather[0].main);
    $('.weather-icon').attr('src', 'http://openweathermap.org/img/w/' + json.weather[0].icon + '.png');
    $('.weather-temp span').text(round(json.main.temp) + '°');
    $('.max-temp').text(round(json.main.temp_max) + '°');
    $('.min-temp').text(round(json.main.temp_min) + '°');
    $('.weather-humidity span').text(json.main.humidity);

    $('.deg span').text(json.wind.deg);
    $('.gust span').text(json.wind.gust);
    $('.speed span').text(json.wind.speed);
    $('.weather-pressure span').text(json.main.pressure);
  }
}

$(function() {

  preventEnter();

  //Show and hide welcome
  $welcome.delay(300).fadeIn().delay(800).fadeOut().hide();

  //Show Main Content
  $main.delay(2000).fadeIn(800);

  //Flash try 'me'
  $('.try-type').fadeIn();

  $searchButton.on('click', function() {
    userInput = $searchText.val();

    if (userInput === 'me') {

      // Ger user's location
      navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;

        //User user's location to get API
        $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&APPID=' + key + '&units=imperial', function(json) {
          setData(json);
        })
      });

    } else {

      // User user input to get API
      $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + userInput + '&units=imperial&APPID=' + key, function(json) {
        setData(json);
      })
    }

  });
});
