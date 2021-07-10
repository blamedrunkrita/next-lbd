import React from 'react'
import { Row, Col, Image } from 'react-bootstrap'
import { useState, useEffect } from 'react'

export const AddPickFrom = ({ setExtras, extras, index, picks }) => {
  const [selected, setSelected] = useState(picks[0]);

  useEffect(() => {
    let newExtras = [...extras]
    newExtras[index].value = selected.price
    setExtras(newExtras)
  }, [extras, index, selected, setExtras])

  const handleSelect = (pick) => {
    setSelected(pick)
    let newExtras = [...extras]
    newExtras[index].value = pick.price
    newExtras[index].pick = pick.name
    setExtras(newExtras)
  }

  return (
    <Row className="d-flex align-items-end">
      <Col sm="12">
        <h5>{extras[index].name}</h5>
        <h6>Select one of the following:</h6>
      </Col>
      {picks && picks.map((pick) => {
        let pickStyle = { backgroundColor: "white" }
        if (selected.name === pick.name) {
          pickStyle.backgroundColor = "#1f9bcf"

        }
        return (
          <Col lg="3" md="4" xs="6" className="text-center my-2">
            <p className="h5 mb-0">{pick.name}</p>
            <Image onClick={() => handleSelect(pick)} src={pick.img} alt={pick.name} style={pickStyle} className="mb-1 p-1 border" fluid />
            <p className="h5 text-info">{pick.price}€</p>
          </Col>
        )
      })}
    </Row >
  )
}