import React, { useState, useContext } from "react"
import Link from "next/link"
import Head from "next/head"
import {
  Row,
  Col,
  ListGroup,
  Jumbotron,
  Alert,
  Button,
  Spinner,
  Container,
  Fade,
} from "react-bootstrap"
import { PlanContext } from "../../contexts/PlanContext.js"
import AddNumParticipants from "../../components/AddNumParticipants"
import { AddExtraPP } from "../../components/AddExtraPP"
import { AddExtraCounter } from "../../components/AddExtraCounter"
import { AddExtraSingle } from "../../components/AddExtraSingle"
import { AddPickFrom } from "../../components/AddPickFrom"
import AutoGallery from "../../components/AutoGallery.js"

import { connectToDatabase } from "../../util/mongodb.js"

const ProductScreen = (props) => {
  const product = props.activity
  const [numParticipants, setNumParticipants] = useState(1)
  const [extras, setExtras] = useState(props.extras)
  const [added, setAdded] = useState(false)

  const { addItem, removeLastItem } = useContext(PlanContext)

  if (product) {
    return (
      <>
        <Head>
          <title>Last Bad Decision | {product.name}</title>
          <meta name="description" content={product.shortDescription} />
        </Head>
        <Fade appear={true} in={true}>
          <Container>
            <br></br>
            <Link href="/activities" className="mb-3">
              <i className="fas fa-arrow-circle-left h1" />
            </Link>
            <Row id="product-info" className="mb-4">
              <Col lg="6" md="12">
                {product && <AutoGallery product={product} />}
              </Col>
              <Col
                lg="6"
                md="12"
                className="d-flex flex-column align-items-center"
              >
                <ListGroup id="product-info-list" variant="flush">
                  <ListGroup.Item>
                    <h1>{product.name}</h1>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <p className="h5">
                      from:{" "}
                      <span className="text-info h2">
                        {product.minPrice
                          ? product.minPrice
                          : product.priceFrom}
                        € {product.pricePP && "pp"}
                      </span>
                    </p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <p className="text-justify">{product.description_long}</p>
                  </ListGroup.Item>
                </ListGroup>
                <Link href={`/enquire/${product.name}`}>
                  <Button variant="info" block>
                    <h3 className="text-light my-0">Enquire Now!</h3>
                  </Button>
                </Link>
              </Col>
            </Row>

            <Jumbotron id="features-section" className="pb-2 pt-3 mb-4">
              <Row className="d-flex justify-content-around">
                {product.features &&
                  product.features.map((feature) => {
                    return (
                      <Col lg="2" md="3" xs="6">
                        <h4>
                          <i className={feature.icon}></i>
                        </h4>
                        <h6>{feature.name}</h6>
                        <p className="h6">{feature.value}</p>
                      </Col>
                    )
                  })}
              </Row>
            </Jumbotron>

            <Row className="mb-2">
              <Col id="included" lg="6">
                <Alert variant="light">
                  <h5>What's included?</h5>
                  {product.included &&
                    product.included.map((include) => {
                      return (
                        <p className="h6 my-3">
                          <i className="fas fa-check-circle text-success" />{" "}
                          {include}
                        </p>
                      )
                    })}
                </Alert>
              </Col>
              <Col id="pro-tips" lg="6">
                <Alert variant="primary">
                  <h5 className="text-center">Pro Tips</h5>
                  {product.proTips &&
                    product.proTips.map((tip) => {
                      return (
                        <div className="my-2">
                          <h6 className="my-0">
                            <strong>{tip.name}</strong>
                          </h6>
                          <p className="h6 my-0">{tip.content}</p>
                        </div>
                      )
                    })}
                </Alert>
              </Col>
            </Row>

            <Jumbotron id="customize" className="py-3 bg-primary">
              <h4 className="text-light mb-0 ">Customize your activity</h4>
            </Jumbotron>

            <Row className="d-flex">
              {product.pricePP && (
                <Col lg="4" md="6" className="mb-4">
                  <AddNumParticipants
                    setNumParticipants={setNumParticipants}
                    pricePP={product.priceFrom}
                    numParticipants={numParticipants}
                  />
                </Col>
              )}
              {extras &&
                renderAddons(
                  product.addons,
                  { setExtras, setNumParticipants },
                  { extras, numParticipants }
                )}
            </Row>
            <Row>
              <Col className="pr-5" md="6">
                <h3>
                  Total Price:{" "}
                  <span className="text-info h2">
                    {getTotalPrice({ product, extras, numParticipants })}€
                  </span>
                </h3>
                <p>
                  Prices are an estimate and might be subject to changes, final
                  price will be provided after enquiry.
                </p>
              </Col>
              <Col className="text-center" md="6">
                <Button
                  disabled={added || product.soldOut}
                  onClick={() => {
                    addItem(
                      JSON.parse(
                        JSON.stringify({
                          id: Math.floor(Math.random() * 100000000),
                          product: JSON.parse(JSON.stringify(product)),
                          numParticipants,
                          extras,
                          totalPrice: getTotalPrice({
                            product,
                            extras,
                            numParticipants,
                          }),
                        })
                      )
                    )
                    setAdded(true)
                  }}
                  variant="info"
                  block
                >
                  {!product.soldOut ? (
                    <h3 className="text-light mb-0">
                      Add to plan <i className="fas fa-calendar-plus" />
                    </h3>
                  ) : (
                    <h3 className="text-light mb-0">
                      Currently Sold Out! <i className="fas fa-calendar-plus" />
                    </h3>
                  )}
                </Button>
                {added && (
                  <>
                    <Alert className="h5 mt-2" variant="success">
                      Added successfully to Your Plan
                    </Alert>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => {
                        removeLastItem()
                        setAdded(false)
                      }}
                    >
                      Remove <i className="fas fa-x"></i>
                    </Button>
                  </>
                )}
              </Col>
            </Row>
          </Container>
        </Fade>
      </>
    )
  } else {
    return (
      <>
        <Spinner animation="grow" variant="secondary" />
        <Spinner animation="grow" variant="secondary" />
        <Spinner animation="grow" variant="secondary" />
      </>
    )
  }
}

const renderAddons = (addons, setters, getters) => {
  if (addons) {
    return addons.map((addon, index) => {
      switch (addon.type) {
        case "addExtraPP":
          return (
            <Col lg="4" md="6" className="mb-4">
              <AddExtraPP
                index={index}
                setExtras={setters.setExtras}
                extras={getters.extras}
                descriptionExtra={addon.description}
              />
            </Col>
          )
        case "addExtraCounter":
          return (
            <Col lg="4" md="6" className="mb-4">
              <AddExtraCounter
                index={index}
                setExtras={setters.setExtras}
                extras={getters.extras}
                descriptionExtra={addon.description}
              />
            </Col>
          )
        case "addExtraSingle":
          return (
            <Col lg="4" md="6" className="mb-4">
              <AddExtraSingle
                index={index}
                setExtras={setters.setExtras}
                extras={getters.extras}
                descriptionExtra={addon.description}
              />
            </Col>
          )
        case "addPickFrom":
          return (
            <Col xl="12" className="mb-4">
              <AddPickFrom
                index={index}
                setExtras={setters.setExtras}
                extras={getters.extras}
                picks={addon.picks}
              />
            </Col>
          )
        default:
          return ""
      }
    })
  }
}

const getTotalPrice = ({ product, extras, numParticipants }) => {
  let total
  if (product.pricePP) {
    total = product.priceFrom * numParticipants
  } else {
    total = product.priceFrom
  }
  let extraPrices = []
  if (extras) {
    extraPrices = extras.map((extra) => {
      if (extra.status) {
        return (extra.value + extra.valuePP * numParticipants) * extra.counter
      } else {
        return 0
      }
    })
  }

  return total + extraPrices.reduce((a, b) => a + b, 0)
}

export default ProductScreen

export async function getStaticPaths() {
  const { db } = await connectToDatabase()
  const activities = await db.collection("activities").find({}).toArray()

  const paths = activities
    .filter((act) => (act.archived == true ? -1 : true))
    .map((activity) => {
      return {
        params: { activity: activity._id },
      }
    })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const { db } = await connectToDatabase()

  const activity = await db
    .collection("activities")
    .findOne({ _id: context.params.activity })

  let extras = null

  if (activity.addons) {
    extras = activity.addons.map((addon) => {
      let newExtra = {
        name: addon.name,
        type: addon.type,
        value: addon.priceExtra,
        valuePP: addon.pricePP,
        status: addon.status,
        counter: addon.counter,
      }

      if (addon.type === "addPickFrom") {
        newExtra.pick = addon.picks[0]
      }
      return newExtra
    })
  }

  console.log(extras)

  return {
    props: {
      activity: activity,
      extras,
    },
    revalidate: 120,
  }
}
