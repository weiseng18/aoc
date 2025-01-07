const fs = require('node:fs')
const data = fs.readFileSync('input.txt', 'utf-8')

const mulPattern = 'mul\\(\\d{1,3},\\d{1,3}\\)'

// part 1
const mulRegex = new RegExp(mulPattern, 'g')
const matches = data.match(mulRegex)

const reducer = (sum, val) => {
  const numbers = val.match(/\d{1,3}/g).map(x => Number(x))
  return sum + numbers[0] * numbers[1]
}

const part1 = matches.reduce(reducer, 0)

console.log(part1)

// part 2
const doPattern = "do\\(\\)"
const dontPattern = "don't\\(\\)"
const combinedPattern = mulPattern + "|" + doPattern + "|" + dontPattern
const combinedRegex = new RegExp(combinedPattern, 'g')
const matchesTwo = data.match(combinedRegex)

const doRegex = new RegExp(doPattern)
const dontRegex = new RegExp(dontPattern)

let isEnabled = true
let part2 = 0
for (const str of matchesTwo) {
  if (str.match(doRegex)) isEnabled = true
  else if (str.match(dontRegex)) isEnabled = false
  else if (isEnabled) {
    part2 = reducer(part2, str)
  }
}

console.log(part2)
