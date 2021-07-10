import React from 'react'
import { Button, Col, Image, Row } from 'react-bootstrap'

const PlanItem = ({ item, removeItem }) => {
  return (
    <div>
      <Row className="border p-1 my-1">
        <Col className="p-2" md="3" sm="4" xs="6">
          <p className="h5 m-0">{item.product.name}</p>
          <Image className="mt-2" src={item.product.images[0]} fluid />
        </Col>
        <Col className="p-2" md="6">
          <p className="h5 ml-3">Breakdown</p>
          <ul style={{ listStyleType: "none" }}>
            {!item.product.minPrice && <li>{"Base Value: " + item.product.priceFrom + "€ X " + item.numParticipants + " = " + item.product.priceFrom * item.numParticipants + "€"}</li>}
            {item.extras && item.extras.map((extra) => {
              if (extra.valuePP && extra.status) {
                return <li>{`${extra.name}: ${extra.valuePP}€ X ${item.numParticipants} = ${extra.valuePP * item.numParticipants}€`}</li>
              } else if (extra.status) {
                return <li>{`${extra.name}: ${extra.value}€ X ${extra.counter} = ${extra.value * extra.counter}€`}</li>
              } else {
                return null
              }
            })}
          </ul>
        </Col>
        <Col className="p-2 d-flex flex-column justify-content-end" md="3">
          <p className="h5 ml-3">{`Item Price:`}</p>
          <h3 className="text-right text-info">{item.totalPrice}€</h3>
          <Button onClick={() => removeItem(item.id)} variant="danger" size="sm" block>Remove Item</Button>
        </Col>



      </Row>

    </div>
  )
}

export default PlanItem
