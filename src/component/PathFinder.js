import React, {useEffect, useState} from 'react'
import Node from './Node.js'
import Header from './Header.js'
import Info from './Info.js'
import { Dijkstra } from '../algorithms/dijkstra.js'
import { BFS } from '../algorithms/bfs.js'
import { DFS } from '../algorithms/dfs.js'
import { getShortestPath } from '../algorithms/getShortestPath.js'
import { recursiveDivision } from '../algorithms/maze/recursiveDivision.js'
import '../App.css'



const PathFinder = ({gridRow, gridCol}) => {
  
  const Algorithms  = {
    BFS: "Breath First Search",
    DFS: "Depth First Search",
    DIJKSTRA: "Dijkstra"
  }

  const [grid, setgrid] = useState([])
  const [startNodeCoord, setstartNodeCoord] = useState({row:10, col:10})
  const [endNodeCoord, setendNodeCoord] = useState({row:5, col:50})

  const [isAnimating, setisAnimating] = useState(false)
  const [isMouseDown, setisMouseDown] = useState(false)
  const [isAnimatedBefore, setisAnimatedBefore] = useState(false)

  const [algorithmSelected, setalgorithmSelected] = useState(Algorithms.DIJKSTRA)

  useEffect(() => {
    createGrid()
    document.getElementsByClassName('grid')[0].addEventListener('mousedown', (e) => {
      e.preventDefault()
      setisMouseDown(true)
    })
    document.getElementsByClassName('grid')[0].addEventListener('mouseup', () => {
      setisMouseDown(false)
    })
  }, [])

  const createGrid = () => {
    let nodes = []
    for(let i = 0; i < gridRow; i++) {
      let nodeRow = []
      for(let j = 0; j < gridCol; j++) {
        nodeRow.push({
          row: i,
          col: j,
          start: i === startNodeCoord.row && j === startNodeCoord.col ? true: false,
          end: i === endNodeCoord.row && j === endNodeCoord.col ? true: false,
          isVisited: false,
          distance: Infinity,
          isWall: false,
          previousNode: null
        })
      }
      nodes.push(nodeRow)
    }
    setgrid(nodes)
  }

  const animateGrid = (visitedNodes, shortestPath) => {
    const delay = 10
    setisAnimating(true)
    setisAnimatedBefore(true)

    visitedNodes.forEach((node, index) => {
      setTimeout(() => {
        const element = getElement(node)
        element[0].className = `node visited ${node.start ? "start":""} ${node.end ? "end":""} node-${node.row}-${node.col}`
      }, delay * index);
    })

    setTimeout(() => {
      shortestPath.forEach((node, index) => {
        setTimeout(() => {
          const element = getElement(node)
          element[0].className = `node shortest ${node.startNode ? "start":""} ${node.endNode ? "end":""} node-${node.row}-${node.col}`
        }, delay * index);
      })
    }, delay * visitedNodes.length);

    setTimeout(() => {
      setisAnimating(false)
    }, delay * (shortestPath.length + visitedNodes.length))

  }

  const handleVisualization = () => {
    const startNode = grid[startNodeCoord.row][startNodeCoord.col]
    const endNode = grid[endNodeCoord.row][endNodeCoord.col]
    let visitedNodes = null
    let shortestPath = null

    if(isAnimatedBefore) {
      handleReset(false)
      setisAnimatedBefore(false)
    }

    switch(algorithmSelected) {
      case Algorithms.DIJKSTRA: 
        visitedNodes = Dijkstra(grid, startNode)  
        shortestPath = getShortestPath(endNode)
        break 
      
      case Algorithms.BFS: 
        visitedNodes = BFS(grid, startNode)
        shortestPath = getShortestPath(endNode)
        break

      case Algorithms.DFS:
        visitedNodes = DFS(grid, startNode)
        shortestPath = getShortestPath(endNode)
        break
      
      default: 
        console.log('Something went wrong!')
    }      
    setisAnimating(true)
    animateGrid(visitedNodes, shortestPath)
  }

  const animateMaze = () => {
    const delay = 10
    setisAnimating(false)
    grid.forEach((row, index) => {
      row.forEach((node, index) => {
        setTimeout(() => {
          const element = getElement(node) 
          element[0].className = `node ${node.isWall ? "wall":""} ${node.start ? "start":""} ${node.end ? "end":""} node-${node.row}-${node.col}`
        }, delay * index);
      })
    })
  }

  const generateMazeDivision = () => {
    handleReset(true)
    const temp = grid
    recursiveDivision(temp, 1, 0, 19, 59, 60, 20, 5)
    setgrid(temp)
    setisAnimating(true)
    animateMaze()
  }

  const handleReset = (isClear = true) => {
    if(isClear) {
      createGrid()
      grid.forEach((row) => {
        row.forEach((node) => {
          const element = getElement(node)
          element[0].className = `node ${node.start ? "start":""} ${node.end ? "end":""} node-${node.row}-${node.col}`
          node.isVisited = false
          node.previousNode = null
          node.isWall = false
          node.distance = Infinity
        })
      })
    }

    else {
      let temp = grid
      temp.forEach((row) => {
        row.forEach((node) => {
          const element = getElement(node)
          element[0].className = `node ${node.isWall? "wall":""} ${node.start ? "start":""} ${node.end ? "end":""} node-${node.row}-${node.col}`
          node.isVisited = false
          node.previousNode = null
          node.distance = Infinity
        })
      })
      setgrid(temp)
    }
  }

  const getElement = (node) => {
    return document.getElementsByClassName(`node-${node.row}-${node.col}`) 
  }

  return (
    <div className='container'>
      <div>
        <Header algorithms={Algorithms} setalgorithmSelected={setalgorithmSelected}/>
        <Info>
          <button onClick={handleReset} disabled={isAnimating}> Clear Grid </button>
          <button onClick={handleVisualization} disabled={isAnimating}> Run {algorithmSelected} </button>
          <button onClick={generateMazeDivision} disabled={isAnimating}> Generate Maze </button>
        </Info>
      </div>
      <table className="grid">
        <tbody>
          {
            grid.map((node, index) => (
                <tr className='row' key={index}>
                  {
                    node.map((n, index) => (<Node key={index} nodeData={n} grid={grid} setgrid={setgrid} isMouseDown={isMouseDown} />))
                  }
                </tr>
              )
            ) 
          }
        </tbody>
      </table>
    </div>
  )
}

export default PathFinder