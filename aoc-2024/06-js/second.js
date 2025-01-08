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
const charAt = (grid, pos) => grid[pos.y][pos.x]

const copyGrid = () => structuredClone(grid)
const copyGuardPos = () => structuredClone(guardPos)
const posToString = (pos) => pos.y + "," + pos.x

const getPath = (grid, guardPos) => {
  const path = new Set()
  let dir = 0
  while (isInBounds(guardPos)) {
    // didMove for early escape
    let didMove = false
    let isOOB = false

    while (!didMove) {
      const nextPos = move(guardPos, deltas[dir])
      if (!isInBounds(nextPos)) {
        isOOB = true
        break
      }

      if (charAt(grid, nextPos) == '#') {
        dir = (dir + 1) % 4
      } else {
        didMove = true
      }
    }

    if (isOOB) break

    guardPos = move(guardPos, deltas[dir])
    path.add(posToString(guardPos))
  }

  return path
}

const hasLoop = (grid, guardPos) => {
  let dir = 0

  const visitedDict = {}
  const updateVisited = (pos, dir) => {
    const strPos = posToString(pos)
    if (visitedDict[strPos]) visitedDict[strPos].add(dir)
    else visitedDict[strPos] = new Set([dir])
  }

  const hasVisited = (pos, dir) => {
    const strPos = posToString(pos)
    const res = strPos in visitedDict && visitedDict[strPos].has(dir)
    return res
  }

  // initial
  updateVisited(guardPos, dir)

  while (isInBounds(guardPos)) {
    // didMove for early escape
    let didMove = false

    const originalDir = dir
    let hasRunAtLeastOnce = false

    while (!didMove) {
      // guard is blocked in all directions
      if (hasRunAtLeastOnce && dir == originalDir) {
        return true
      }
      hasRunAtLeastOnce = true

      // attempt to move
      const nextPos = move(guardPos, deltas[dir])

      // oob, guard exited, not a loop
      if (!isInBounds(nextPos)) {
        return false
      }

      // this direction leads to obstacle, turn
      if (charAt(grid, nextPos) == '#') {
        dir = (dir + 1) % 4
      } else {
        // successful move forward
        didMove = true
        guardPos = nextPos
      }
    }

    if (hasVisited(guardPos, dir)) {
      return true
    }
    updateVisited(guardPos, dir)
  }

  return false
}

let part2 = 0
const guardPath = getPath( copyGrid(), copyGuardPos() )
guardPath.delete( guardPos )

for (const pathPos of guardPath) {
  const split = pathPos.split(",")
  const obstaclePos = {
    y: split[0],
    x: split[1]
  }

  const tempGrid = copyGrid()
  tempGrid[ obstaclePos.y ][ obstaclePos.x ] = '#'
  if (hasLoop( tempGrid, copyGuardPos() )) {
    part2++
  }
}

console.log(part2)
