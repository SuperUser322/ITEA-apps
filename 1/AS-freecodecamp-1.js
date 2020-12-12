//1
function convertToF(celsius) {
    let fahrenheit = celsius * 9 / 5 + 32;
    return fahrenheit;
}

convertToF(30);

// ������ �������, ������ ��������� ��������� ��� � �� ���� ������ ����� ��� ������ �������
function convertToF(celsius) {
    return celsius * 9 / 5 + 32;
}

convertToF(30);

//2 - �������������
function reverseString(str) {
    return str.split('').reverse().join('');
}

console.log(reverseString("hello"));

//2 - ������������
function reverseString(str) {
    var newString = '';         //var ��� ������� ��� � �� �����������, �� ���� ���������
    for (let index = str.length - 1; index >= 0; index-=1) {
        newString += str.charAt(index);
    }
    return newString;
}

console.log(reverseString("hello"));


//3 - ������ ������������, ����� ����� ������� ���-�� ���������� ��� if, �� �� ���� ���
function factorialize(num) {
    if (num === 0) {
        return 1;
    }

    return num * factorialize(num - 1);
}

console.log(factorialize(5));

//3 - �������������
function factorialize(num) {
    return num === 0 ? 1 : num * factorialize(num - 1); //�������� ���������� ��� ������ � ���������� "?"
}

console.log(factorialize(5));


//4 - ������������,  �������� � ����� ������ ����� ����� � reduce �������, �� �������� ���� �������, � �� ����� �����
function findLongestWordLength(str) {
    let splittedStr = str.split(' ');
    let largestWord = 0;

    for (let index = 0; index < splittedStr.length; index += 1) {
        if (splittedStr[index].length > largestWord) {
            largestWord = splittedStr[index].length;
        }
    }
    return largestWord;
}

console.log(findLongestWordLength("The quick brown fox jumped over the lazy dog"));


//5 - ������������
function largestOfFour(arr) {
    let newArray = [];
    for (let i = 0; i < arr.length; i += 1) {
        let largestNumber = arr[i][0];
        for (let j = 1; j < arr[i].length; j += 1) {
            if (largestNumber < arr[i][j]) {
                largestNumber = arr[i][j];
            }
        }
        newArray[i] = largestNumber;
    }
    return newArray;
}

console.log(largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]));