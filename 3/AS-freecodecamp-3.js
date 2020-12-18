//11 декларативное, если делать императивно то по идее оно будет работать быстрее и так же будет очень многоэтажным
const titleCase = (str) => str = str.toLowerCase().replace(/(^|\s)\S/g, letter => letter.toUpperCase());

titleCase("I'm a little tea pot");


//12 декларативное
function frankenSplice(arr1, arr2, n) {
    let newArr = arr2.slice();
    newArr.splice(n, 0, arr1);
    return newArr.flat();       //.flat() это такой метод, который убирает вложенности, уже им пользовался
}

frankenSplice([1, 2, 3], [4, 5, 6], 1);


//13 декларативное
const bouncer = (arr) => arr.filter(Boolean);

bouncer([7, "ate", "", false, 9]);


//14 императивное
function getIndexToIns(arr, num) {
    let number = 0;
    if (arr.length === 0) {
        return 0;
    }
    for (let i = 0; i < arr.length; i += 1) {
        if (arr[i] < num) {
            number += 1;
        }
    }
    return number
}

getIndexToIns([40, 60], 50);

//14    вроде даже так можно
function getIndexToIns(arr, num) {
    let number = 0;
    for (let i = 0; i < arr.length; i += 1) {
        if (arr[i] < num) {
            number += 1;
        }
    }
    return number
}

getIndexToIns([40, 60], 50);


//15
function mutation(arr) {
    let check = arr[1].toLowerCase();
    for (var i = 0; i < check.length; i++) {
        if (arr[0].toLowerCase().indexOf(check[i]) < 0) return false;
    }
    return true;
}

mutation(["hello", "hey"]);


//16
function chunkArrayInGroups(arr, size) {
    var arr1 = [];
    while (arr.length) {
        arr1.push(arr.splice(0, size));
    }
    return arr1;
}

console.log(chunkArrayInGroups(["a", "b", "c", "d"], 2));