import { React, useState } from 'react'

export const AddExtraCounter = ({ index, extras, setExtras, descriptionExtra }) => {

  const [counter, setCounter] = useState(0)

  const handleIncrement = () => {
    setCounter(counter + 1)
    let newExtras = [...extras]
    newExtras[index].counter++
    newExtras[index].status = true
    setExtras(newExtras)
  }

  const handleDecrement = () => {
    if (counter > 0) {
      setCounter(counter - 1)
      let newExtras = [...extras]
      newExtras[index].counter--
      (newExtras[index].counter === 0) && (newExtras[index].status = false)
      setExtras(newExtras)

    }
  }

  return (
    <div>
      <h5>{extras[index].name}</h5>
      <h6>Price for each: <span className="text-info h5">{extras[index].value}€</span></h6>
      <p className="text-justify h6">{descriptionExtra}</p>
      <h3>
        <div onClick={handleDecrement} className="btn p-0 mr-3"><i className="fas fa-minus-circle h3" /></div>
        <span >{counter}</span>
        <div onClick={handleIncrement} className="btn p-0 ml-3"><i className="fas fa-plus-circle h3" /></div>
      </h3>
    </div>
  )
}
