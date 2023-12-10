const fs = require('fs');

const input = fs.readFileSync('10.txt', 'utf8');
const values = input.split('\n');


function longestPath(values) {
    let jLength = values[0].length
    let startingPoint = []
    let maze = []

    for (let i = 0; i < values.length; i++) {
        maze[i] = []
        for (let j = 0; j < jLength; j++) {
            maze[i][j] = values[i][j]
            if (values[i][j] === 'S') {
                startingPoint.push(i)
                startingPoint.push(j)
            }
        }
    }

    let i = startingPoint[0]
    let j = startingPoint[1] + 1
    let direction = 'L'
    let count = 0

    // | - 7 J L F 
    while (true) {
        let item = maze[i][j]
        // from left and 7 go down
        // from left and - go right
        // from left and J go up
        // from right and L go up
        // from right and F go down
        // from right and - go left
        // from top and J go left
        // from top and L go right
        // from top and | go down
        // from down and 7 go left
        // from down and F go right
        // from down and | go up
        switch (direction) {
            case "L":
                if (item === "7") {
                    i = i + 1
                    direction = "T"
                } else if (item === "-") {
                    j = j + 1
                    direction = "L"
                } else if (item === "J") {
                    i = i - 1
                    direction = "D"
                }
                break
            case "R":
                if (item === "L") {
                    i = i - 1
                    direction = "D"
                } else if (item === "F") {
                    i = i + 1
                    direction = "T"
                } else if (item === "-") {
                    j = j - 1
                    direction = "R"
                }
                break
            case "T":
                if (item === "J") {
                    j = j - 1
                    direction = "R"
                } else if (item === "L") {
                    j = j + 1
                    direction = "L"
                } else if (item === "|") {
                    i = i + 1
                    direction = "T"
                }
                break
            case "D":
                if (item === "7") {
                    j = j - 1
                    direction = "R"
                } else if (item === "F") {
                    j = j + 1
                    direction = "L"
                } else if (item === "|") {
                    i = i - 1
                    direction = "D"
                }
                break
        }
        count++

        if (i === 107 && j === 110) {
            break
        }
    }

    console.log({startingPoint, count: (count + 1) / 2})
}


longestPath(values)