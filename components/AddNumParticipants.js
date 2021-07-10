import React from 'react'

const AddNumParticipants = ({ setNumParticipants, pricePP, numParticipants }) => {

  const handleIncrement = () => {
    setNumParticipants(numParticipants + 1)
  }

  const handleDecrement = () => {
    if (numParticipants > 1) {
      setNumParticipants(numParticipants - 1)
    }
  }

  return (
    <div>
      <h5>Number of Participants</h5>
      <h6>Price for each: <span className="text-info h5">{pricePP}€</span></h6>
      <h3>
        <div onClick={handleDecrement} className="mr-3 btn p-0"><i className="fas fa-minus-circle h3" /></div>
        <span>{numParticipants}</span>
        <div onClick={handleIncrement} className="ml-3 btn p-0"><i className="fas fa-plus-circle h3" /></div>
      </h3>
    </div >
  )
}

export default AddNumParticipants