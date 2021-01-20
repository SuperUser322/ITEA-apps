// #1 императивно

function sumAll(arr) {
    let minNum;
    let maxNum;
    let x = 0;
    if (arr[0] < arr[arr.length - 1]) {
        minNum = arr[0]; maxNum = arr[arr.length - 1]
    } else {
        maxNum = arr[0]; minNum = arr[arr.length - 1]
    }
    for (var i = minNum; i <= maxNum; i = i + 1) {
        x = x + i;
    }
    return x;
}

sumAll([1, 4]);

// #2 декларативное

function diffArray(arr1, arr2) {
    return arr1
        .concat(arr2)
        .filter(item => !arr1.includes(item) || !arr2.includes(item));
}

// #3 декларативное

function destroyer(arr) {
    var args = Array.prototype.slice.call(arguments);
    for (let i = 0; i < arr.length; i = i + 1) {
        for (let j = 0; j < args.length; j = j + 1) {
            if (arr[i] === args[j]) {
                delete arr[i];
            }
        }
    }
    return arr.filter(Boolean);
}

destroyer([1, 2, 3, 1, 2, 3], 2, 3);