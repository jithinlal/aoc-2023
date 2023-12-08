const fs = require('fs');

const input = fs.readFileSync('8.txt', 'utf8');
const values = input.split('\n');


function findSteps(values) {
    let instructions = []
    let hash = {}
    let startingKeys = []

    for (let i = 0; i < values.length; i++) {
        let value = values[i]

        if (i === 0) {
            instructions = value.split('')
            continue
        }

        if (i === 1) {
            continue
        }

        let splits = value.split('=')
        let key = splits[0].trim()
        let mapper = splits[1].trim()
        hash[key] = mapper.slice(1, -1).split(', ')

        if (key.includes('A')) {
            startingKeys.push(key)
        }
    }


    console.log({startingKeys})

    let steps = []
    let i = 0

    for (let j = 0; j < startingKeys.length; j++) {
        let i = 0
        let key = startingKeys[j]
        let count = 0

        while (true) {
            let ins = instructions[i]
            if (ins === 'L') {
                key = hash[key][0]
            } else {
                key = hash[key][1]
            }

            count++

            if (key.includes('Z')) {
                break
            }

            i++

            if (i === instructions.length) {
                i = 0
            }
        }

        steps[j] = count
    }

    console.log({steps: lcmArray(steps)})
}


function gcd(a, b) {
    if (b === 0) {
        return a
    }

    return gcd(b, a % b)
}

function lcm(a, b) {
    return Math.abs(a * b) / gcd(a, b)
}

function lcmArray(arr) {
    let currLcm = arr[0]

    for (let i = 1; i < arr.length; i++) {
        currLcm = lcm(currLcm, arr[i])
    }

    return currLcm
}

findSteps(values)