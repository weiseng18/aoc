const fs = require('node:fs')
const data = fs.readFileSync('input.txt', 'utf-8')

const lines = data.split("\n")
lines.pop()

left = []
right = []

rightDict = {}

for (const line of lines) {
  arr = line.split("   ")

  a = Number(arr[0])
  b = Number(arr[1])

  rightDict[b] = rightDict[b] ? rightDict[b]+1 : 1

  left.push(a)
  right.push(b)
}

const ans = left.reduce((sum, val) => sum += Math.abs((rightDict[val] ?? 0) * val), 0)

console.log(ans)
