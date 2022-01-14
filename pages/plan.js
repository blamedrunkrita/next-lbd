import React, { useContext, useState, useEffect } from "react"
import { Button, Container, Jumbotron, Fade, Alert } from "react-bootstrap"
import Link from "next/link"
import PlanItem from "../components/PlanItem"
import { PlanContext } from "../contexts/PlanContext"

const YourPlanScreen = () => {
  const { plan, resetPlan, removeItem } = useContext(PlanContext)
  const [planPrice, setPlanPrice] = useState(0)

  useEffect(() => {
    let newPlanPrice = 0
    plan.forEach((item) => (newPlanPrice += item.totalPrice))
    setPlanPrice(newPlanPrice)
  }, [plan])

  return (
    <>
      <Head>
        <title>LBD | About Us</title>
        <meta
          name="description"
          content={"Who we are, what we do and why we do it!"}
        />
      </Head>
      <Fade appear={true} in={true}>
        <div className="mt-n3">
          <Jumbotron
            className="mb-0 px-5 py-5 text-center banner"
            style={{
              background:
                "url('/images/banner_plan.jpg') no-repeat center center",
              backgroundSize: "cover",
              minHeight: "30vh",
            }}
            fluid
          >
            <Container className="pt-3">
              <h1 className="text-light title-text">Your Tailor-fitted plan</h1>
              <h5 className="text-light">
                We believe that a really bad decision might be just what you
                need to start a life full of good ones. Think of this Lisbon
                trip as an investment in your future and don't skimp on the poor
                choices
              </h5>
            </Container>
          </Jumbotron>
          <Container>
            {plan.length !== 0 ? (
              <>
                {plan.map((item) => (
                  <PlanItem removeItem={removeItem} item={item} />
                ))}
                <h5>
                  Total Price:{" "}
                  <span className="h3 text-info">{planPrice}€</span>
                </h5>
                <Link href="/enquire/plan" passHref>
                  <Button variant="info" className="mr-3">
                    Send us Your Plan!
                  </Button>
                </Link>
                <Button variant="danger" onClick={resetPlan}>
                  Reset Plan
                </Button>
                <br />
                <br />
              </>
            ) : (
              <>
                <Alert variant="danger" className="mt-3 p-4 h5">
                  No Items Added to Your Plan
                </Alert>
                <Link href="/activities" passHref>
                  <Button variant="primary" className="mr-3">
                    Check out our activities!
                  </Button>
                </Link>
              </>
            )}
          </Container>
        </div>
      </Fade>
    </>
  )
}

export default YourPlanScreen
