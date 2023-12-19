const fs = require('fs');

const input = fs.readFileSync('19.txt', 'utf8');

let values = input.split('\n')

let x
let baseHash = {}
for (let i = 0; i < values.length; i++) {
    if (values[i] === "") {
        x = i + 1
        break
    }

    let items = values[i].split('{')
    baseHash[items[0]] = items[1].slice(0, -1).split(',')
}

let keys = []
for (let j = x; j < values.length; j++) {
    let items = values[j].slice(1, -1).split(',')
    let hash = {}
    for (let i = 0; i < items.length; i++) {
        let val = items[i].split('=')
        hash[[val[0]]] = +val[1]
    }
    keys.push(hash)
}

let sum = 0
for (let i = 0; i < keys.length; i++) {
    let ep = "in"
    let {x, m, a, s} = keys[i]


    let flag = true
    while (flag) {
        let items = baseHash[ep]

        for (let j = 0; j < items.length; j++) {
            let item = items[j]

            console.log({item})

            let exp = item.split(':')

            if (exp.length > 1) {
                let check = exp[0]
                let np = exp[1]

                let greater = check.split(">")
                let lesser = check.split("<")

                if (greater.length > lesser.length) {
                    let key = greater[0]
                    let value = +greater[1]

                    if (key === "x") {
                        if (x > value) {
                            if (np === "A") {
                                sum += x + m + s + a
                                console.log("x greater", sum)
                                flag = false
                                break
                            } else if (np === "R") {
                                flag = false
                                break
                            } else {
                                ep = np
                                break
                            }
                        }
                    } else if (key === "m") {
                        if (m > value) {
                            if (np === "A") {
                                console.log("m greater", sum)
                                sum += x + m + s + a
                                flag = false
                                break
                            } else if (np === "R") {
                                flag = false
                                break
                            } else {
                                ep = np
                                break
                            }
                        }
                    } else if (key === "a") {
                        if (a > value) {
                            if (np === "A") {
                                console.log("a greater", sum)
                                sum += x + m + s + a
                                flag = false
                                break
                            } else if (np === "R") {
                                flag = false
                                break
                            } else {
                                ep = np
                                break
                            }
                        }
                    } else if (key === "s") {
                        if (s > value) {
                            if (np === "A") {
                                console.log("s greater", sum)
                                sum += x + m + s + a
                                flag = false
                                break
                            } else if (np === "R") {
                                flag = false
                                break
                            } else {
                                ep = np
                                break
                            }
                        }
                    }
                    console.log({"great": true, x, np})
                } else {
                    let key = lesser[0]
                    let value = +lesser[1]

                    if (key === "x") {
                        if (x < value) {
                            if (np === "A") {
                                console.log("x lesser", sum)
                                sum += x + m + s + a
                                flag = false
                                break
                            } else if (np === "R") {
                                flag = false
                                break
                            } else {
                                ep = np
                                break
                            }
                        }
                    } else if (key === "m") {
                        if (m < value) {
                            if (np === "A") {
                                console.log("m lesser", sum)
                                sum += x + m + s + a
                                flag = false
                                break
                            } else if (np === "R") {
                                flag = false
                                break
                            } else {
                                ep = np
                                break
                            }
                        }
                    } else if (key === "a") {
                        if (a < value) {
                            if (np === "A") {
                                console.log("a lesser", sum)
                                sum += x + m + s + a
                                flag = false
                                break
                            } else if (np === "R") {
                                flag = false
                                break
                            } else {
                                ep = np
                                break
                            }
                        }
                    } else if (key === "s") {
                        if (s < value) {
                            console.log({np})
                            if (np === "A") {
                                console.log("s lesser", sum)
                                sum += x + m + s + a
                                flag = false
                                break
                            } else if (np === "R") {
                                flag = false
                                break
                            } else {
                                ep = np
                                break
                            }
                        }
                    }
                }

                console.log({"less": true, x, np})
            } else if (exp[0] === "A") {
                sum += x + m + s + a
                flag = false
                break
            } else if (exp[0] === "R") {
                flag = false
                break
            } else {
                ep = exp[0]
                console.log({x, ep})
                break
            }
        }
    }
//    console.log({sum, x, m, a, s})
}

console.log({sum})