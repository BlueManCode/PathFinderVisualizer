export const recursiveDivision = (grid, startRow, startCol, endRow, endCol, width, height, minimumDivisionSize) => {
  if(width <= minimumDivisionSize || height <= minimumDivisionSize) return

  let isVertical = width > height ? true : false 

  if(isVertical) {
    let possibleCols = []
    for(let i = startCol; i < endCol; i += 2) {
      possibleCols.push(i)
    }

    let wallRow = startRow
    let wallCol = possibleCols[Math.floor(Math.random() * possibleCols.length)]

    createWall(grid, wallRow, wallCol, endRow, endCol, width, height, isVertical)
    createPassage(grid, wallRow, wallCol, endRow, endCol, isVertical)

    // move left
    recursiveDivision(grid, startRow, startCol, endRow, wallCol, wallCol - startCol, endRow - wallRow, minimumDivisionSize)
    // move right
    recursiveDivision(grid, wallRow, wallCol, endRow, endCol, endCol - wallCol, endRow - wallRow, minimumDivisionSize)
  }

  else {
    let possibleRows = []
    for(let i = startRow; i < endRow; i += 2) {
      possibleRows.push(i)
    }

    let wallRow = possibleRows[Math.floor(Math.random() * possibleRows.length)]
    let wallCol = startCol

    createWall(grid, wallRow, wallCol, endRow, endCol, width, height)
    createPassage(grid, wallRow, wallCol, endRow, endCol, isVertical)

    // move top
    recursiveDivision(grid, startRow, startCol, wallRow, endCol, endCol - startCol, wallRow - startRow, minimumDivisionSize)
    // move down
    recursiveDivision(grid, wallRow, wallCol, endRow, endCol, endCol - wallCol, endRow - wallRow, minimumDivisionSize)
  }
}

const createWall = (grid, startRow, startCol, endRow, endCol, width, height, isVertical) => {

  // x is constant
  if(isVertical) {
    let i = startRow
    while(i <= endRow) {
      if(!grid[i][startCol].end && !grid[i][startCol].start)
        grid[i][startCol].isWall = true
      i++
    }
  }

  // y is constant
  else {
    let i = startCol
    while(i <= endCol) {
      if(!grid[startRow][i].end && !grid[startRow][i].start)
        grid[startRow][i].isWall = true
      i++
    }
  }
}

const createPassage = (grid, startRow, startCol, endRow, endCol, isVertical) => {
  if(isVertical) {
    const index = Math.floor(Math.random() * ((endRow - 1) - (startRow + 1)) + (startRow+1))
    grid[index][startCol].isWall = false
  }
  else {
    const index = Math.floor(Math.random() * ((endCol - 1) - (startCol + 1)) + (startCol + 1))
    grid[startRow][index].isWall = false
  }

}