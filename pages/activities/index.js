import React, { useState } from "react"
import { Row, Col, Jumbotron, Button, Container, Fade } from "react-bootstrap"
import Product from "../../components/Product"
import { connectToDatabase } from "../../util/mongodb"
import Head from "next/head"

const Activities = (props) => {
  const { products, tags } = props

  const [showFilter, setShowFilter] = useState(true)
  const [filter, setFilter] = useState(null)

  const handleToggleFilter = () => {
    setShowFilter(!showFilter)
  }

  const handleToggleTag = (tag) => {
    if (filter === tag) {
      setFilter(null)
    } else {
      setFilter(tag)
    }
  }

  return (
    <>
      <Head>
        <title>LBD | Our Activities in Lisbon</title>
        <meta
          name="description"
          content="Check all our tailored Stag, Hen and Group activities in Lisbon"
        />
      </Head>
      <Fade appear={true} in={true}>
        <div id="activities" className="mt-n3">
          <Jumbotron
            className="mb-0 px-5 py-5 text-center banner"
            style={{
              background: 'url("/images/activities_hero.jpg") no-repeat center',
              backgroundSize: "cover",
              minHeight: "30vh",
            }}
            fluid
          >
            <Container className="pt-5">
              <h2 className="text-light title-text h1 mb-4">
                Lisbon Activities
              </h2>

              {/*<Button
                variant="outline-light"
                size="sm"
                onClick={handleToggleFilter}
              >
                {showFilter ? "Hide" : "Show"} Filters{" "}
                {filter ? (
                  <i className="fas fa-filter text-info"></i>
                ) : (
                  <i className="fas fa-filter"></i>
                )}
                </Button> */}
            </Container>
          </Jumbotron>
          {showFilter && (
            <Jumbotron className="bg-info mb-0 p-2 banner">
              <Container>
                <Row className="no-gutters mx-n1">
                  <Col className="p-1" xs="6" sm="4" md="3" lg="2">
                    <Button
                      variant="light"
                      size="sm"
                      className="h6 m-0 py-1 px-1"
                      block
                      onClick={() => handleToggleTag(null)}
                    >
                      All Activities
                    </Button>
                  </Col>
                  {tags &&
                    tags.sort().map((tag) => {
                      if (filter !== tag) {
                        return (
                          <Col
                            className="p-1"
                            xs="6"
                            sm="4"
                            md="3"
                            lg="2"
                            key={`tag-key-${tag}`}
                          >
                            <Button
                              variant="outline-light"
                              size="sm"
                              onClick={() => handleToggleTag(tag)}
                              className="h6 m-0 py-1 px-1"
                              block
                            >
                              {tag}
                            </Button>
                          </Col>
                        )
                      } else {
                        return (
                          <Col
                            className="p-1"
                            xs="6"
                            sm="4"
                            md="3"
                            lg="2"
                            key={`tag-key-${tag}`}
                          >
                            <Button
                              variant="light"
                              size="sm"
                              onClick={() => handleToggleTag(tag)}
                              className="h6 m-0 py-1 px-1"
                              block
                            >
                              {tag}
                            </Button>
                          </Col>
                        )
                      }
                    })}
                </Row>
              </Container>
            </Jumbotron>
          )}
          <Container>
            <Row className="no-gutters mx-n2 mt-3">
              {products &&
                products.map((product) => {
                  if (
                    !filter ||
                    product.tags.filter((tag) => tag === filter).length > 0
                  ) {
                    return (
                      <Col
                        xs="12"
                        sm="4"
                        md="4"
                        lg="3"
                        key={product._id}
                        className="d-flex align-items-stretch px-2 mb-3"
                      >
                        <Product product={product} />
                      </Col>
                    )
                  } else {
                    return null
                  }
                })}
            </Row>
          </Container>
        </div>
      </Fade>
    </>
  )
}

export default Activities

export async function getStaticProps() {
  const { db } = await connectToDatabase()
  const activities = await db.collection("activities").find({}).toArray()

  let tags = []
  activities.forEach((activity) => {
    activity.tags.forEach((tag) => {
      if (!tags.includes(tag)) {
        tags.push(tag)
      }
    })
  })
  let sortedActivities = activities
    .sort((a, b) => {
      if (a.name > b.name) {
        return 1
      } else {
        return -1
      }
    })
    .sort((a, b) => {
      if (a.bestSeller && !b.bestSeller) {
        return -1
      } else if (!a.bestSeller && b.bestSeller) {
        return 1
      } else {
        return 0
      }
    })

  return {
    props: {
      products: JSON.parse(JSON.stringify(sortedActivities)),
      tags,
    },
    revalidate: 120,
  }
}
