//1
function convertToF(celsius) {
    let fahrenheit = celsius * 9 / 5 + 32;
    return fahrenheit;
}

convertToF(30);


//2
function reverseString(str) {
    return str.split('').reverse().join('');
}

reverseString("hello");


//3
function factorialize(num) {
    if (num === 0) {
        return 1;
    }

    return num * factorialize(num - 1);
}

console.log(factorialize(5));


//4
function findLongestWordLength(str) {
    let splittedStr = str.split(' ');
    let x = 0;

    for (let i = 0; i < splittedStr.length; i+=1) {
        if (splittedStr[i].length > x) {
            x = splittedStr[i].length;
        }
    }
    return x;
}

console.log(findLongestWordLength("The quick brown fox jumped over the lazy dog"));

//5
function largestOfFour(arr) {
    let x = [];
    for (let i = 0; i < arr.length; i += 1) {
        let numb = arr[i][0];
        for (let j = 1; j < arr[i].length; j += 1) {
            if (numb < arr[i][j]) {
                numb = arr[i][j];
            }
        }
        x[i] = numb;
    }
    return x;
}

console.log(largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]));