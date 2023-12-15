const fs = require('fs');

const input = fs.readFileSync('15.txt', 'utf8');

function focusPower(value) {
    let items = value.split(',')
    let map = {}

    for (let i = 0; i < items.length; i++) {
        let [char, val] = findAll(items[i])

        let box = asciiSum(char)

        if (map[box]) {
            let x = find(map[box], char)
            if (x !== -1) {
                map[box][x][char] = val
            } else {
                map[box].push({[char]: val})
            }
        } else {
            map[box] = [{[char]: val}]
        }
    }


    let sum = 0
    Object.keys(map).forEach(key => {
        let x = 0
        for (let i = 0; i < map[key].length; i++, x++) {
            let ans = (+key + 1) * (x + 1) * Object.values(map[key][i])[0]
            if (ans === 0) {
                x--
            }
            sum += ans
        }
    })

    return sum
}

function findAll(char) {
    let items = char.split('=')
    let str
    let val = 0
    if (items.length === 1) {
        str = items[0].slice(0, -1)
    } else {
        str = items[0]
        val = +items[1]
    }

    return [str, val]
}

function find(arr, ch) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][ch]) {
            return i
        }
    }

    return -1
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

console.log(focusPower(input))