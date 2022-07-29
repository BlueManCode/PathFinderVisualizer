import React from 'react'
import './Header.css'

const Header = ({algorithms, setalgorithmSelected}) => {

  const handleChange = (e) => {
    setalgorithmSelected(e.target.value)
  }

  return (
    <div className='header_container'>
      <label>Choose an algorithm</label>
      <select onChange={handleChange}>
        <option value={algorithms.DIJKSTRA}>{algorithms.DIJKSTRA}</option>
        <option value={algorithms.BFS}>{algorithms.BFS}</option>
        <option value={algorithms.DFS}>{algorithms.DFS}</option>
      </select>
    </div>
  )
}

export default Header