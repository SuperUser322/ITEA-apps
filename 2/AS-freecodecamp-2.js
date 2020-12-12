//6
function confirmEnding(str, target) {
    return str.indexOf(target, str.length - target.length) !== -1;
}

confirmEnding("Bastian", "n");

//.endsWith()
const confirmEnding = (str, target) => str.endsWith(target);

confirmEnding("Bastian", "n");

//7 c for некрасиво, зато не копипаста
function repeatStringNumTimes(str, num) {
    var newStr = '';
    for (; num > 0; num -= 1) {
        newStr += str;
    }
    if (num <= 0) {
        return newStr;
    }
}

repeatStringNumTimes("abc", 3);


// with .repeat()
function repeatStringNumTimes(str, num) {
    return num < 0 ? '' : str.repeat(num);
}

repeatStringNumTimes("abc", 3);


//8 что-то многовато условий вышло...
function truncateString(str, num) {
    let newStr = '';
    if (num > str.length) {
        num = str.length;
    }
    for (let i = 0; i < num; i += 1) {
        newStr += str[i];
    }
    if (num !== str.length) {
        newStr += '...';
    }
    return newStr;
}

truncateString("A-tisket a-tasket A green and yellow basket", 8);


//9
function findElement(arr, func) {
    for (let i = 0; i < arr.length; i += 1) {
        if (func(arr[i])) {
            return arr[i];
        }
    }
    return undefined;
}

findElement([1, 2, 3, 4], num => num % 2 === 0);


//10 декларативное решение
function booWho(bool) {
    return typeof bool === "boolean" ? true : false;
}

booWho(null);

//10 очень декларативное
const booWho = (bool) => typeof bool === "boolean" ? true : false;

booWho(null);
