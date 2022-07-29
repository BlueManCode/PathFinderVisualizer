// grid => 2d array
// start => start node
// end => end node

export const Dijkstra = (grid, start) => {

  let visitedNodes = []
  start.distance = 0
  let unVisitedNodes = getAllUnVisitiedNodes(grid)
  
  while(unVisitedNodes.length > 0) {
    // sort the unVisited nodes to get the one with smallest distance
    sortUnVisitedNodes(unVisitedNodes)
    
    // get the current node to check
    let currentNode = unVisitedNodes.shift()
    
    // continue if the current node is a wall
    if (currentNode.isWall) continue 

    // if currentNode distance is Infinity then there is no
    // way to reach the final position
    if(currentNode.distance === Infinity) return visitedNodes

    currentNode.isVisited = true
    visitedNodes.push(currentNode)

    // if currentNode is the end node
    if(currentNode.end) return visitedNodes

    // update the unVisitedNodes list
    updateUnVisitedNodes(currentNode, grid)
  }
  return visitedNodes
}

const updateUnVisitedNodes = (currentNode, grid) => {

  const visitableNodes = []
  const {row, col} = currentNode
  if (row > 0 && !grid[row - 1][col].isVisited) visitableNodes.push(grid[row - 1][col]);
  if (row < grid.length - 1 && !grid[row + 1][col].isVisited) visitableNodes.push(grid[row + 1][col]);
  if (col > 0 && !grid[row][col - 1].isVisited) visitableNodes.push(grid[row][col - 1]);
  if (col < grid[0].length - 1 && !grid[row][col + 1].isVisited) visitableNodes.push(grid[row][col + 1]);

  visitableNodes.forEach((node) => {
    node.distance = currentNode.distance + 1;
    node.previousNode = currentNode;
  })
}

const sortUnVisitedNodes = (unVisitedNodes) => {
  unVisitedNodes.sort((nodeA, nodeB) => {
    if(nodeA.distance < nodeB.distance) return -1 // sort A before B
    else if (nodeA.distance > nodeB.distance) return 1 // sort A after B
    else return 0 // they are the same, let them be
  })
}

// function to generate all the nodes copy
// used to save nodes in the unvisited array
const getAllUnVisitiedNodes = (grid) => {
  const nodes = []
  grid.forEach(row => {
    row.forEach(node => {
      nodes.push(node)
    })
  });
  return nodes
}
