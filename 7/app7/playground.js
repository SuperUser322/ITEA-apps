const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

const articles = [];

function createWay(event) {
    let q = event.value;
    fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=v2w0q0FJVyQE2SYBYmEHe0EshoeSJDWi&q=' + q + '&sort=best')
        .then(function (blob) {
            return blob.json();
        })
        .then(function (data) {
            let xdata = data
            displayData(event, xdata);
        });
}

function findMatches(docs, text) {
    return docs.filter(function (doc) {
        let headAndTitle = doc.headline.main.includes(text) || doc.abstract.includes(text);
        return headAndTitle || doc.byline.original;
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

function displayData(event, data) {    
    if (event.value === '') {
        resetText();
    } else {
        let firstLetter = event.value[0];

        let secondaryValue = '';
        if (firstLetter === firstLetter.toUpperCase()) {
            secondaryValue = event.value.replace(firstLetter, firstLetter.toLowerCase());
        } else {
            secondaryValue = event.value.replace(firstLetter, firstLetter.toUpperCase());
        }

        let matchArray = findMatches(data.response.docs, event.value);
        suggestions.innerHTML = matchArray.map(function (doc) {
            console.log(doc);
            let superstring = `<a href="${doc.web_url}">title: ${doc.headline.main}<br>article: ${doc.abstract}</a><br>byline: ${doc.byline.original}<br>`;
            return `
                <li>
                    <span>${stringProcessing(superstring, event.value, secondaryValue)}</span>
                </li>
            `
        }).join('');
    }
}

let searchTimeout = null;
searchInput.addEventListener('keyup', function() {
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }

    searchTimeout = setTimeout(() => {
        createWay(searchInput);
    }, 500);
});

const resetIcon = document.querySelector('.fa-times');
resetIcon.addEventListener('click', resetText);