import React from 'react'
import DropDownModelItem from './DropDownModelItem.js'
import './Header.css'

const DropDownModel = ({isOpen, setisOpen, items, setalgorithmSelected}) => {

  return (
    <div className='dropdownmodel-container'>
      <div className='button' onClick={() => setisOpen(!isOpen)}>Select Algorithm</div>
      <div style={{ display: `${ isOpen ? "": "none"}`}} className="model">
        {Object.values(items).map((item, key) => <DropDownModelItem item={item} setalgorithmSelected={setalgorithmSelected} isOpen={isOpen} setisOpen={setisOpen}/>)}
      </div>
    </div>
  )
}

export default DropDownModel