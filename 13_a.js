const fs = require('fs');

const input = fs.readFileSync('13.txt', 'utf8');
const values = input.split("\n\n").map((e) => e.split("\n"));


function findSum(values) {
    let sum = 0
    for (const value of values) {
        let ans = findRowCol(value)
        if (ans) {
            sum += ans
        } else {
            let ans = findRowCol(transposeStringArray(value))
            sum += ans * 100
        }
    }

    console.log({sum})
}


function findRowCol(value) {
    // row
    let arr = []
    for (let i = 0; i < value.length; i++) {
        for (let j = 1; j < value[i].length; j++) {
            let x = value[i].length - j
            let left;
            let right;
            if (x > j) {
                left = value[i].slice(0, j)
                right = value[i].slice(j, j + j)
            } else {
                left = value[i].slice(j - x, j)
                right = value[i].slice(j, value[i].length)
            }

            if (left === right.split('').reverse().join('')) {
                arr.push(j)
            }
        }
    }

    let map = {}
    for (const a of arr) {
        if (!map[a]) {
            map[a] = 1
        } else {
            map[a]++
        }
    }

    let ans;
    Object.keys(map).forEach(item => {
        if (map[item] === value.length) {
            ans = +item
        }
    })

    return ans
}

function transposeStringArray(array) {
    let transposedArray = [];
    for (let col = 0; col < array[0].length; col++) {
        let newRow = '';
        for (let row = 0; row < array.length; row++) {
            newRow += array[row][col];
        }
        transposedArray.push(newRow);
    }
    return transposedArray;
}

findSum(values)