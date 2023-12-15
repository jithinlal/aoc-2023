const fs = require('fs');

const input = fs.readFileSync('15.txt', 'utf8');
const value = input


function findASCIISum(value) {
    let items = value.split(',')
    let sum = 0

    for (let i = 0; i < items.length; i++) {
        sum += asciiSum(items[i])
    }

    return sum
}


function asciiSum(item) {
    let sum = 0
    for (let i = 0; i < item.length; i++) {
        let asc = item.charCodeAt(i)
        sum = findHash(asc + sum)
    }

    return sum
}


function findHash(asc) {
    return (asc * 17) % 256
}

console.log(findASCIISum(value))