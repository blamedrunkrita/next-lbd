import { Col, Image, Row } from 'react-bootstrap'

const Gallery = (product) => {


  return (
    <Row className="mx-0 mt-2 p-0">
      <Col xs="3" className="p-0">
        <Image className="gallery-image pr-1" src={product.images[0]} alt="gallery1" fluid />
      </Col>
      <Col xs="3" className="p-0">
        <Image className="gallery-image pr-1" src={product.images[1]} alt="gallery2" fluid />
      </Col>
      <Col xs="3" className="p-0">
        <Image className="gallery-image pr-1" src={product.images[2]} alt="gallery3" fluid />
      </Col>
      <Col xs="3" className="p-0">
        <Image className="gallery-image" src={product.images[3]} alt="gallery3" fluid />
      </Col>
    </Row>
  )
}

export default Gallery
