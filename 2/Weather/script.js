var city = document.getElementById('city');
var humidity = document.getElementById('humidity');
var pressure = document.getElementById('pressure');
var temperature = document.getElementById('temperature');
var windSpeed = document.getElementById('wind-speed');
var weatherIcon = document.getElementById('weather-icon');
var getWeatherButton = document.getElementById('get-weather');

function getLocationCoords() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            getWeatherData(position.coords.latitude, position.coords.longitude);
        })
    } else {
        alert('Your browser does not support Navigator API');
    }
}

function getWeatherData(latitude, longitude) {
    fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=08d1316ba8742c08076e7425c28c2614')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayData(data);
        })
}

function displayData(data) {
    city.innerText = data.name;
    humidity.innerText = data.main.humidity + ' %';
    pressure.innerText = data.main.pressure + ' килограмм на метр в секунде';       //давление, не знаю в чём оно тут приходит и в чём измеряется тоже xD
    temperature.innerText = kToC(data.main.temp) + 'ºC';
    windSpeed.innerText = data.wind.speed + ' м/с';
    weatherIcon.innerHTML = ("<img src='http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png'>");
    console.log(data);
}

function kToC(k) {
    return Math.round(k - 273.15);      //из кельвинов в цельсии
}

getWeatherButton.addEventListener('click', getLocationCoords);