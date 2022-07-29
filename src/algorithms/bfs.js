// LIFO
export const BFS = (grid, startNode) => {

  let visitedNodes = []
  let queue = []

  queue.unshift(startNode)

  while(queue.length > 0) {
    let currentNode = queue.pop()

    // mark current node as visited
    currentNode.isVisited = true
    visitedNodes.push(currentNode)

    // current node is a wall
    if(currentNode.isWall) continue

    // found the end node
    if(currentNode.end) return visitedNodes

    // update the queue to get all of the visitable nodes
    queue = [...updateQueue(grid, currentNode), ...queue]
  }
  return visitedNodes
}

const updateQueue = (grid, currentNode) => {

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
