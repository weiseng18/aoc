const fs = require('node:fs')
const data = fs.readFileSync('input.txt', 'utf-8')

const lines = data.split("\n")
lines.pop()

// Process orderings
const pairs = new Set()
let i = 0
while (lines[i] != "") {
  pairs.add(lines[i])
  i++
}

i++

// Computation
let part1 = 0
let part2 = 0
for (; i<lines.length; i++) {
  const update = lines[i]
  const pages = update.split(",")
  
  const indices = Array.from(Array(pages.length).keys())

  // for every (i,j) index pair, where i < j,
  // if pages[i] > pages[j], then it is a problem
  const can = !indices.some(i =>
    indices.some(j =>
      i < j && pairs.has(pages[j]+"|"+pages[i])
    )
  )

  const middleIndex = (pages.length - 1) / 2
  if (can) {
    part1 += Number(pages[middleIndex])
  } else {
    // Comparison function
    const cmp = (a, b) => {
      if (pairs.has(a+"|"+b)) return -1
      if (pairs.has(b+"|"+a)) return 1
      return 0
    }

    pages.sort(cmp)
    part2 += Number(pages[middleIndex])
  }
}

console.log(part1)
console.log(part2)
