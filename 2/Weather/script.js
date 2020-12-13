var city = getElement('#city');
var humidity = getElement('#humidity');
var pressure = getElement('#pressure');
var temperature = getElement('#temperature');
var windSpeed = getElement('#wind-speed');
var weatherIcon = getElement('.weather-icon');
var getWeatherButton = getElement('#get-weather');
var loader = getElement('.loader');
var hiddenPart = getElement('.hidden-part');

function getElement(selector) {
    return document.querySelector(selector);
}

function getLocationCoords() {
    getWeatherButton.style.display = 'none';
    hiddenPart.style.visibility = 'visible'
    loader.style.display = 'block';
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            setTimeout(() => { loader.style.display = 'none' }, 1000);
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
    pressure.innerText = hPaTommHg(data.main.pressure) + ' мм рт ст';
    temperature.innerText = kToC(data.main.temp) + 'ºC';
    windSpeed.innerText = data.wind.speed + ' м/с';
    weatherIcon.innerHTML = ("<img src='http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png'>");
    console.log(data);
}

function kToC(k) {      //из кельвинов в цельсии
    return Math.round(k - 273.15);
}

function hPaTommHg(hPa) {       //из гектопаскалей в миллиметры ртутного столба
    return Math.round(hPa * 0.75006375541921);
}

getWeatherButton.addEventListener('click', getLocationCoords);