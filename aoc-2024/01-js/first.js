const fs = require('node:fs')
const data = fs.readFileSync('input.txt', 'utf-8')

const lines = data.split("\n")
lines.pop()

left = []
right = []
for (const line of lines) {
  arr = line.split("   ")
  left.push(Number(arr[0]))
  right.push(Number(arr[1]))
}

left.sort()
right.sort()

const ans = left.reduce((sum, val, idx) => sum += Math.abs(right[idx] - val), 0)

console.log(ans)
