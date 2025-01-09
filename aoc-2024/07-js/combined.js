const fs = require('node:fs')
const data = fs.readFileSync('input.txt', 'utf-8')

const lines = data.split("\n")
lines.pop()

const part1 = lines.reduce(
  (acc, line) => {
    let tokens = line.split(" ")
    const target = Number(tokens[0].substr(0, tokens[0].length-1))
    const numbers = tokens.map((x) => Number(x)).filter((x, i) => i > 0)

    const maxBitmask = (1 << (numbers.length-1))

    const collect = (bitmask) => numbers.reduce(
      (acc, val, idx) => {
        return bitmask & (1<<(idx-1)) ? acc+val : acc*val
      }
    )
    
    const res = Array.from(Array(maxBitmask).keys()).some(bitmask => collect(bitmask) == target)
    return acc + (res ? target : 0)
  },
  0
)

const NUM_OPS = 3
const part2 = lines.reduce(
  (acc, line) => {
    let tokens = line.split(" ")
    const target = Number(tokens[0].substr(0, tokens[0].length-1))
    const numbers = tokens.map((x) => Number(x)).filter((x, i) => i > 0)

    const maxBitmask = Math.pow(NUM_OPS, numbers.length-1)

    const collect = (bitmask) => numbers.reduce(
      (acc, val, idx) => {
        const which = Math.floor(bitmask / Math.pow(NUM_OPS, idx-1)) % NUM_OPS
        if (which == 0) return acc + val
        return which == 1 ? acc*val : Number(String(acc) + val)
      }
    )
    
    const res = Array.from(Array(maxBitmask).keys()).some(bitmask => collect(bitmask) == target)
    return acc + (res ? target : 0)
  },
  0
)

console.log(part1)
console.log(part2)
