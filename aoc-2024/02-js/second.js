const fs = require('node:fs')
const data = fs.readFileSync('input.txt', 'utf-8')

const lines = data.split("\n")
lines.pop()

const isDecreasing = arr => arr.every((val, i, arr) => i == 0 || arr[i-1] > val)
const isIncreasing = arr => arr.every((val, i, arr) => i == 0 || arr[i-1] < val)
const isGradual = arr => arr.every((val, i, arr) => {
  if (i == 0) return true;
  const diff = Math.abs(arr[i-1] - val)
  return 1 <= diff && diff <= 3
})

const isOk = arr => (isIncreasing(arr) || isDecreasing(arr)) && isGradual(arr)

let ans = 0
for (const line of lines) {
  const arr = line.split(" ").map(x => Number(x))

  if (isOk(arr)) {
    ans++
  } else {
    const res = Array.from(Array(arr.length).keys()).some(x => {
      const copiedArr = arr.slice()
      copiedArr.splice(x, 1)
      return isOk(copiedArr)
    })
    if (res) ans++
  }
}

console.log(ans)
