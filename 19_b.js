const input = require('fs').readFileSync('19.txt', 'utf8')

const parse = (data) => {
    const [w, p] = data.split('\n\n')

    const workflows = {}
    w.split('\n').forEach(l => {
        const [name, rules] = l.split('{')
        workflows[name] = rules.slice(0, -1).split(',').map(r => {
            const rr = r.split(':')
            return rr[1] ? {rule: rr[0], target: rr[1]} : {target: rr[0]}
        })
    })

    const parts = p.split('\n').map(l => ({
            wf: 'in', ...Object.fromEntries(l.slice(1, -1).split(',').map(p => {
                const pp = p.split('=')
                return [pp[0], Number(pp[1])]
            }))
        })
    )

    return {workflows, parts}
}

const {workflows, parts} = parse(input)

let result1 = 0

parts.forEach(part => {
    while (1) {
        with ({...part, wf: workflows[part.wf]}) {
            part.wf = (wf.find(r => !!eval(r.rule)) || wf[wf.length - 1]).target
        }
        if (part.wf === 'R') {
            break
        }
        if (part.wf === 'A') {
            result1 += (part.x + part.m + part.a + part.s)
            break
        }
    }
})

console.log('P1:', result1)

// === 2 ===

console.time('P2')

const start = {wf: 'in', xmin: 1, xmax: 4000, mmin: 1, mmax: 4000, amin: 1, amax: 4000, smin: 1, smax: 4000}
let result2 = 0

const queue = [start]

while (queue.length) {
    const part = queue.shift()

    if (part.wf === 'R') {
        continue
    } // drop
    if (part.wf === 'A') { // accepted batch
        const pieces = (
            (1 + part.xmax - part.xmin) *
            (1 + part.mmax - part.mmin) *
            (1 + part.amax - part.amin) *
            (1 + part.smax - part.smin))
        result2 += pieces
        console.log('A:', ['x', 'm', 'a', 's'].map(c => `${c}: [${part[`${c}min`]} => ${part[`${c}max`]}]`).join(' '))
        continue
    }

    // split and add to queue
    workflows[part.wf].forEach(rule => {
        if (rule.rule) {
            const [v, op, ...val] = rule.rule.split('')
            const limit = Number(val.join(''))
            const next = {...part, wf: rule.target}
            if (op === '<') {
                next[`${v}max`] = Math.min(next[`${v}max`], limit - 1)
                queue.push(next)
                // remaining
                part[`${v}min`] = Math.max(part[`${v}min`], next[`${v}max`] + 1)
            } else if (op === '>') {
                next[`${v}min`] = Math.max(next[`${v}min`], limit + 1)
                queue.push(next)
                // remaining
                part[`${v}max`] = Math.min(part[`${v}max`], next[`${v}min`] - 1)
            }
        } else {
            // no rule, just add to queue
            queue.push({...part, wf: rule.target})
        }
    })
}

console.log('P2:', result2)
console.timeEnd('P2')