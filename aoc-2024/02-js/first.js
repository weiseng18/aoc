const fs = require('node:fs')
const data = fs.readFileSync('input.txt', 'utf-8')

const lines = data.split("\n")
lines.pop()

let ans = 0
for (const line of lines) {
  const arr = line.split(" ").map(x => Number(x))
  const isDecreasing = arr.every((val, i, arr) => i == 0 || arr[i-1] > val)
  const isIncreasing = arr.every((val, i, arr) => i == 0 || arr[i-1] < val)
  const isGradual = arr.every((val, i, arr) => {
    if (i == 0) return true;
    const diff = Math.abs(arr[i-1] - val)
    return 1 <= diff && diff <= 3
  })

  if ((isIncreasing || isDecreasing) && isGradual)
    ans++
}

console.log(ans)
