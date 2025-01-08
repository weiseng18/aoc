const fs = require('node:fs')
const data = fs.readFileSync('input.txt', 'utf-8')

let grid = data.split("\n")
grid.pop()

grid = grid.map((row) => Array.from(row))

let rows = grid.length
let cols = grid[0].length

// Find guard position
let guardPos
for (let i=0; i<rows; i++)
  for (let j=0; j<cols; j++)
    if (grid[i][j] == "^") guardPos = {y: i, x: j}


// Simulate
const isInBounds = (pos) => 
  !(pos.y < 0 || pos.y >= rows || pos.x < 0 || pos.x >= cols)

const deltas = [
  {y:-1, x:0},
  {y:0, x:1},
  {y:1, x:0},
  {y:0, x:-1}
]

const move = (pos, delta) => ({y: pos.y + delta.y, x: pos.x + delta.x})
const charAt = (pos) => grid[pos.y][pos.x]
const markSpot = (pos) => grid[pos.y][pos.x] = 'X'

// Mark initial spot
markSpot(guardPos)

let dir = 0
while (isInBounds(guardPos)) {
  // didMove for early escape
  let didMove = false
  let isOOB = false

  while (!didMove) {
    const nextPos = move(guardPos, deltas[dir])
    if (!isInBounds(nextPos)) {
      isOOB = true
      break;
    }

    if (charAt(nextPos) == '#') {
      dir = (dir + 1) % 4
    } else {
      didMove = true
    }
  }

  if (isOOB) break

  guardPos = move(guardPos, deltas[dir])
  markSpot(guardPos)
}

// Count
const part1 = grid.reduce(
  (acc, row) => acc +
    row.reduce( 
      (acc2, cell) => acc2 + (cell == 'X' ? 1 : 0),
      0
    ),
  0
)

console.log(part1)
