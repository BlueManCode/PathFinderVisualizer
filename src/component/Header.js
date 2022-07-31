import React, {useState} from 'react'
import DropDownModel from './DropDownModel.js'
import './Header.css'

const Header = ({algorithms, setalgorithmSelected, isAnimating, children}) => {

  const [isOpen, setisOpen] = useState(true)
  const [items, setitems] = useState(algorithms)

  return (
    <div className='header-container'>
      <div>
        <DropDownModel isOpen={isOpen} setisOpen={setisOpen} items={items} setalgorithmSelected={setalgorithmSelected}/>
      </div>
      {children}
    </div>
  )
}

export default Header