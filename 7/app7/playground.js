const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
    .then(function (blob) {
        return blob.json();
    })
    .then(function (data) {
        cities.push(...data);
    });

function findMatches(text, cities, secondText) {
    return cities.filter(function (place) {
        let cityStateMain = place.city.includes(text) || place.state.includes(text);
        let cityStateAnother = place.city.includes(secondText) || place.state.includes(secondText)
        return cityStateMain || cityStateAnother;
    })
}

function resetText() {
    suggestions.innerHTML = '';
    searchInput.value = '';
}

function stringProcessing(string, value, secondaryValue) {
    let newString = string.replaceAll(value, `<mark>${value}</mark>`).replaceAll(secondaryValue, `<mark>${secondaryValue}</mark>`);
    return newString;
}
function displayMatches(event) {
    let secondaryValue = '';
    if (event.target.value[0] === event.target.value[0].toUpperCase()) {
        secondaryValue = event.target.value.replace(event.target.value[0], event.target.value[0].toLowerCase());
    } else {
        secondaryValue = event.target.value.replace(event.target.value[0], event.target.value[0].toUpperCase());
    }

    if (this.value === '') {
        suggestions.innerHTML = '';
    } else {
        let matchArray = findMatches(event.target.value, cities, secondaryValue);
        suggestions.innerHTML = matchArray.map(function (place) {
            
        let superstring = place.city + ' ' + place.state;
        return `
            <li>
                <span>${stringProcessing(superstring, event.target.value, secondaryValue)}</span>
            </li>
        `
        }).join('');
    }
}

searchInput.addEventListener('keyup', displayMatches);

const resetIcon = document.querySelector('.fa-times');
resetIcon.addEventListener('click', resetText);