import React, {useState} from 'react'
import '../App.css'

const Node = ({nodeData, grid, setgrid, isMouseDown}) => {

  const [wall, setwall] = useState(nodeData.isWall)

  const handleClick = () => {
    let temp = grid
    temp[nodeData.row][nodeData.col].isWall = !temp[nodeData.row][nodeData.col].isWall
    setgrid(temp) 
    setwall(temp[nodeData.row][nodeData.col].isWall)
  }
  
  const handleMouseEnter = (e) => {
    if(isMouseDown) {
      let temp = grid
      temp[nodeData.row][nodeData.col].isWall = !temp[nodeData.row][nodeData.col].isWall
      setgrid(temp) 
      setwall(temp[nodeData.row][nodeData.col].isWall)
    }
  }

  return (
    <td 
      onClick={handleClick} 
      onMouseEnter={handleMouseEnter}
      className={`
      ${nodeData.start ? "start":""} 
      ${nodeData.end ? "end": ""} 
      ${wall ? "wall": ""} 
      node-${nodeData.row}-${nodeData.col}`}></td>
  )
}

export default Node