import React from 'react'
import { Button } from 'react-bootstrap'
import { useState } from 'react'

export const AddExtraSingle = ({ descriptionExtra, setExtras, extras, index }) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive)
    let newExtras = [...extras]
    newExtras[index].status = !isActive
    setExtras(newExtras)
  }

  return (
    <div>
      <h5>{extras[index].name}</h5>
      <h6>Extra price: <span className="text-info h5">{extras[index].value}€</span></h6>
      <p className="text-justify h6">{descriptionExtra}</p>

      {isActive ?
        <Button variant="danger" size="sm" onClick={handleToggle}>Remove Extra</Button> :
        <Button size="sm" onClick={handleToggle}>Add Extra</Button>
      }
    </div >
  )
}
