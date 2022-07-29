
// get the shortest path
export const getShortestPath = (endNode) => {
  const shortestPath = []
  let currentNode = endNode

  if(endNode.previousNode !== null) {
    while(currentNode !== null) {
      shortestPath.push(currentNode)
      currentNode = currentNode.previousNode
    }
  
    // remove the start and the end points
    shortestPath.shift()
    shortestPath.pop()
  
    return shortestPath
  }
  return []
}