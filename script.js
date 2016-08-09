//Set random icon color
var randomColor = (function() {
    var colors = ['#92bcff', '#d692ff', '	#ffd692', '	#ffa092']
    var randomNumber = Math.floor(Math.random() * colors.length);

    return function() {
        return colors[randomNumber];
    };

});

//Prevent enter key from reloading the page
var preventEnter = function() {
    $(window).keydown(function(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
        }
    })
}();

// Round numbers
function round(item) {
    return Math.round(item);
}

// Animaite the main content up after initial search
function animateTop(item) {
    $('.main-content').animate({
        top: String(item)
    });
}

//Set page content after search
function setContent(json) {
    $('.search-container').hide().fadeIn();
    $('.city-name').text(json.name);
    $('.weather-desc').text(json.weather[0].main);
    $('.weather-icon').attr('src', 'http://openweathermap.org/img/w/' + json.weather[0].icon + '.png');
    $('.weather-temp span').text(round(json.main.temp) + '°');
    $('.max-temp').text(round(json.main.temp_max) + '°');
    $('.min-temp').text(round(json.main.temp_min) + '°');
    $('.weather-humidity span').text(json.main.humidity);
    // Display Right
    $('.deg span').text(json.wind.deg);
    $('.gust span').text(json.wind.gust);
    $('.speed span').text(json.wind.speed);
    $('.weather-pressure span').text(json.main.pressure);
}

// Get JSON and set all values on the page. Show error if invalid search
function setData(json) {

    if (json.message === 'Error: Not found city') {
        // Show error for invalid search
        $('.validator').fadeIn('slow').delay(700).fadeOut();

    } else {
        // Give icon random color after search
        $('.hero i').hide().css('color', randomColor()).fadeIn(1000);

        // Animate page after initia search
        if ($(window).width() > 480) {
            animateTop(120);
        } else {
            animateTop(8);
        }
        // Set weather content | Display Left
        setContent(json);
    }
}

$(function() {

    //Show and hide welcome
    $('.welcome').delay(300).fadeIn().delay(800).fadeOut().hide();

    //Show Main Content
    $('.main-content').delay(2000).fadeIn(800);

    // Click search to invoke json parsing and display results
    $('.search-button').on('click', function() {
        let userInput,
            lat,
            long,
            $searchText = $('.search-text'),
            key = '22e0a3505a1754a4f9b38c2fe79e22c2';

        userInput = $searchText.val().trim();

        // Invoke geolocation
        if (userInput === 'me') {
            // Ger user's location
            navigator.geolocation.getCurrentPosition(function(position) {
                lat = position.coords.latitude;
                long = position.coords.longitude;

                //Use user's location to get API
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

    })
});
