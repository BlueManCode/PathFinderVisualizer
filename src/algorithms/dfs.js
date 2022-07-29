// FIFO
export const DFS = (grid, startNode, endNode) => {

  let visitedNodes = []
  let stack = []

  stack.push(startNode)

  while(stack.length > 0) {
    let currentNode = stack.shift()

    // mark current node as visited
    currentNode.isVisited = true
    visitedNodes.push(currentNode)

    // current node is a wall
    if(currentNode.isWall) continue

    // found the end node
    if(currentNode.end) return visitedNodes

    // update the queue to get all of the visitable nodes
    stack = [...updateStack(grid, currentNode), ...stack]
  }
  return visitedNodes
}

const updateStack = (grid, currentNode) => {

  const visitableNodes = []
  const {row, col} = currentNode
  
  if (row > 0 && !grid[row - 1][col].isVisited && !grid[row - 1][col].isWall) visitableNodes.push(grid[row - 1][col]);
  if (row < grid.length - 1 && !grid[row + 1][col].isVisited && !grid[row + 1][col].isWall) visitableNodes.push(grid[row + 1][col]);
  if (col > 0 && !grid[row][col - 1].isVisited && !grid[row][col - 1].isWall) visitableNodes.push(grid[row][col - 1]);
  if (col < grid[0].length - 1 && !grid[row][col + 1].isVisited && !grid[row][col + 1].isWall) visitableNodes.push(grid[row][col + 1]);

  visitableNodes.forEach((node) => {
    node.previousNode = currentNode;
    node.isVisited = true
  })

  return visitableNodes
}
