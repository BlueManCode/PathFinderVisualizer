import React from 'react'

const DropDownModelItem = ({item, setalgorithmSelected, isOpen, setisOpen}) => {

  const handleSelected = () => {
    setalgorithmSelected(item)
    setisOpen(false)
  }

  return (
    <div className='model-items'onClick={handleSelected}>{item}</div>
  )
}

export default DropDownModelItem