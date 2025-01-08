const fs = require('node:fs')
const data = fs.readFileSync('input.txt', 'utf-8')

const lines = data.split("\n")
lines.pop()

const rows = lines.length
const cols = lines[0].length

let offsets = {}
offsets["right"] = [[0,-1], [0,0], [0,1]]
offsets["right_down"] = [[-1,-1], [0,0], [1,1]]
offsets["down"] = [[-1,0], [0,0], [1,0]]
offsets["left_down"] = [[-1,1], [0,0], [1,-1]]
offsets["left"] = [[0,1], [0,0], [0,-1]]
offsets["left_up"] = [[1,1], [0,0], [-1,-1]]
offsets["up"] = [[1,0], [0,0], [-1,0]]
offsets["right_up"] = [[1,-1], [0,0], [-1,1]]

const extract = (r, c, dir) => {
  let str = ""
  for (let i=0; i<3; i++) {
    const offset = offsets[dir][i]
    str += lines[r + offset[0]][c + offset[1]]
  }
  return str
}

const pairs = [
  ["right_down", "left_down"],
  ["right_down", "right_up"],
  ["left_up", "left_down"],
  ["left_up", "right_up"],
]

const checkSpot = (r, c) => {
  for (const pair of pairs) {
    const firstStr = extract(r, c, pair[0])
    const secondStr = extract(r, c, pair[1])

    if (firstStr == "MAS" && secondStr == "MAS") {
      return true
    }
  }
  return false
}

let ans = 0
for (let i=1; i<rows-1; i++)
  for (let j=1; j<cols-1; j++) {
    if (checkSpot(i, j))
      ans++
  }

console.log(ans)
