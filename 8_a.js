const fs = require('fs');

const input = fs.readFileSync('8.txt', 'utf8');
const values = input.split('\n');


function findSteps(values) {
    let instructions = []
    let hash = {}

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
    }

    let steps = 0
    let key = 'AAA'
    let i = 0

    while (true) {
        let ins = instructions[i]

        if (ins === 'L') {
            key = hash[key][0]
        } else {
            key = hash[key][1]
        }

        steps++

        if (key === 'ZZZ') {
            break
        }

        i++

        if (i === instructions.length) {
            i = 0
        }
    }

    console.log({steps})
}


findSteps(values)