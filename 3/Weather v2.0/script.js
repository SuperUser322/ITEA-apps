window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = true;

var words = getElement('.words');
var p = document.createElement('p');
words.appendChild(p);

var city = getElement('#city');
var humidity = getElement('#humidity');
var pressure = getElement('#pressure');
var temperature = getElement('#temperature');
var windSpeed = getElement('#wind-speed');
var weatherIcon = getElement('.weather-icon');
var getWeatherButton = getElement('#get-weather');
var loader = getElement('.loader');
var hiddenPart = getElement('.hidden-part');
var weatherWrapper = getElement('.weather-wrapper');

function getElement(selector) {
    return document.querySelector(selector);
}

function getLocationCoords(cityName) {
    getWeatherButton.style.display = 'none';
    hiddenPart.style.visibility = 'visible';

    loader.style.display = 'block';
    if (navigator.geolocation) {
        setTimeout(() => { loader.style.display = 'none' }, 1000);
        getWeatherData(cityName);
    } else {
        alert('Your browser does not support Navigator API');
    }
}

function getWeatherData(q) {
    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + q + '&appid=08d1316ba8742c08076e7425c28c2614')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayData(data);
        })
}

function displayData(data) {

    console.log(data);
    city.innerText = data.name;
    humidity.innerText = data.main.humidity + ' %';
    pressure.innerText = hPaTommHg(data.main.pressure) + ' мм рт ст';
    temperature.innerText = kToC(data.main.temp) + 'ºC';
    windSpeed.innerText = data.wind.speed + ' м/с';
    weatherIcon.innerHTML = ("<img src='http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png'>");
}

function kToC(k) {      //из кельвинов в цельсии
    return Math.round(k - 273.15);
}

function hPaTommHg(hPa) {       //из гектопаскалей в миллиметры ртутного столба
    return Math.round(hPa * 0.75006375541921);
}

function checkingСommands(commands) {         //функция с разложением комманд
    console.log(commands);          //на всякий случай
    let coms = commands.split(' ');
    let cityName = coms[0];
    cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
    let start = coms[1];
    if (start === 'go') {
        return getLocationCoords(cityName);
    } else console.log('Error: Unknown command.')
}

recognition.addEventListener('result', function (event) {
    p.innerText = Array
        .from(event.results)
        .map(function (result) {
            return result[0];
        })
        .map(function (result) {
            return result.transcript;
        })                                    //ГДЕ-ТА ТУТА ОТЧЕБУЧИВАНИЕ ЧУЧИ(ЛОГИКА) С "ГОРОД" и "ГОУ" (комманды)
    if (event.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
        return weatherWrapper.style.visibility = 'visible';
    }
    checkingСommands(p.innerText);
    setTimeout(() => { words.remove(); }, 1000);
});


recognition.start();

getWeatherButton.addEventListener('click', getLocationCoords);

