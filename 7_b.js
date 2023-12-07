const fs = require('fs');

const input = fs.readFileSync('7.txt', 'utf8');
const values = input.split('\n');

function totalWinnings(values) {
    const hash = {}
    let arr = []

    for (const value of values) {
        let line = value.split(" ")
        hash[line[0]] = line[1]
        arr.push(line[0])
    }

    arr = arr.sort((a, b) => {
        let fA = findHand(a)
        let fB = findHand(b)

        if (fA > fB) {
            return 1
        } else if (fA < fB) {
            return -1
        } else {
            if (compare(a, b) === 1) {
                return 1
            } else {
                return -1
            }
        }
    })

    let sum = 0
    let rank = 1
    arr.forEach(item => {
        sum += rank * hash[arr[rank - 1]]
        rank++
    })

    console.log(sum)
}

function findHand(item) {
    let hash = {}
    for (let i = 0; i < item.length; i++) {
        if (hash[item[i]]) {
            hash[item[i]]++
        } else {
            hash[item[i]] = 1
        }
    }

    if (hash['J'] && hash['J'] !== 5) {
        let biggest = 0
        let biggestKey = ''
        Object.keys(hash).forEach(key => {
            if (key !== 'J' && hash[key] > biggest) {
                biggest = hash[key]
                biggestKey = key
            }
        })
        hash[biggestKey] = hash[biggestKey] + hash['J']
        hash['J'] = 0
    }

    let arr = Object.values(hash)

    arr = arr.sort(function (a, b) {
        return b - a
    })

    if (arr[0] === 1) {
        return 1
    } else if (arr[0] === 2 && arr[1] === 1) {
        return 2
    } else if (arr[0] === 2 && arr[1] === 2) {
        return 3
    } else if (arr[0] === 3 && arr[1] === 1) {
        return 4
    } else if (arr[0] === 3 && arr[1] === 2) {
        return 5
    } else if (arr[0] === 4) {
        return 6
    } else if (arr[0] === 5) {
        return 7
    } else {
        console.log("error")
    }
}


function compare(a, b) {
    for (let i = 0; i < a.length; i++) {
        let rsa = relativeStrength(a[i])
        let rsb = relativeStrength(b[i])

        if (rsa > rsb) {
            return 1
        } else if (rsa < rsb) {
            return 0
        }
    }
}


function relativeStrength(item) {
    let hash = {
        'A': 13,
        'K': 12,
        'Q': 11,
        'T': 10,
        '9': 9,
        '8': 8,
        '7': 7,
        '6': 6,
        '5': 5,
        '4': 4,
        '3': 3,
        '2': 2,
        'J': 1,
    }

    return hash[item]
}

totalWinnings(values)