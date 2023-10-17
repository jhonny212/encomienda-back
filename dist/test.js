"use strict";
const fun = (arr) => {
    const cols = arr[0].length;
    const rows = arr[1].length;
    let diag1 = 0;
    let diag2 = 0;
    for (let i = 0; i < cols; i++) {
        diag1 += arr[i][i];
    }
    for (let i = cols - 1; i >= 0; i--) {
        diag2 += arr[cols - i - 1][i];
    }
};
const myArray = [];
myArray.push([1, 2, 3]);
myArray.push([1, 5, 3]);
myArray.push([2, 1, 3]);
fun(myArray);
