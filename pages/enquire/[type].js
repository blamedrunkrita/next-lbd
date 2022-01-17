import React, { useContext, useEffect, useState } from "react"
import {
  Container,
  Form,
  Col,
  Row,
  Button,
  Jumbotron,
  Fade,
  Alert,
} from "react-bootstrap"
import { PlanContext } from "../../contexts/PlanContext"
import emailjs, { init } from "emailjs-com"
import DatePicker from "react-datepicker"
import { useRouter } from "next/router"

import "react-datepicker/dist/react-datepicker.css"

const EnquireScreen = () => {
  const router = useRouter()
  const { plan } = useContext(PlanContext)
  const [info, setInfo] = useState({})
  const [enquiryType, setEnquiryType] = useState(router.query.type)
  const [changed, setChanged] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [planPrice, setPlanPrice] = useState(0)

  useEffect(() => {
    init("user_OD34z4OcHU5rI3lbSoL5i")
  }, [])

  useEffect(() => {
    if (changed) {
      if (enquiryType === "plan") {
        setInfo({
          ...info,
          enquiry:
            "Hello Last Bad Decision,\n\nI would like to know more details about the activities in My Plan and their availability for the requested dates. I would also like to receive instructions with the steps I need to take towards completing my reservation.\n\n[...]",
        })
      } else if (enquiryType === "general") {
        setInfo({
          ...info,
          enquiry:
            "Hello Last Bad Decision,\n\nI would like to know more about [...]",
        })
      } else {
        setInfo({
          ...info,
          enquiry: `Hello Last Bad Decision,\n\nI would like to know more about details regarding the ${enquiryType} activity.\n\n[...]`,
        })
      }
      setChanged(false)
    }
  }, [changed, info, enquiryType])

  useEffect(() => {
    let newPlanPrice = 0
    plan.forEach((item) => (newPlanPrice += item.totalPrice))
    setPlanPrice(newPlanPrice)
  }, [plan])

  const handleChange = (e) => {
    let newUpdate = { ...info }
    newUpdate[e.target.id] = e.target.value
    setInfo(newUpdate)
  }

  const handleTogglePlan = () => {
    enquiryType !== "plan"
      ? setEnquiryType("plan")
      : setEnquiryType(router.query.type)
    setChanged(true)
  }

  const handleSubmit = (e) => {
    setSubmitted(true)
    e.preventDefault()

    let parsedPlan = ""

    if (enquiryType === "plan") {
      plan.forEach((item) => {
        let newItem = {
          activity: item.product._id,
          extras: item.extras && item.extras.filter((extra) => extra.status),
          numParticipants: item.numParticipants,
          totalPrice: item.totalPrice,
        }

        parsedPlan += JSON.stringify(newItem, null, "&nbsp;")
          .split("\n")
          .join("<br>")
      })
    }

    var templateParams = {
      ...info,
      subject: "New Enquiry for Last Bad Decision",
      type: enquiryType,
      customerPlan: parsedPlan,
      planPrice,
    }

    console.log(templateParams.customerPlan)

    emailjs.send("service_o6oxknd", "template_o0z3jgg", templateParams).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text)
      },
      function (error) {
        console.log("FAILED...", error)
      }
    )
  }

  return (
    <>
      <Head>
        <title>LBD | Enquire</title>
        <meta
          name="description"
          content={"Send an Enquiry to Last Bad Decision"}
        />
      </Head>
      <Fade in={true} appear={true}>
        <div className="mt-n3">
          <Jumbotron
            className="mb-3 px-5 py-5 text-center banner"
            style={{
              background:
                "url('/images/banner_enquiry.jpg') no-repeat center center",
              backgroundSize: "cover",
              minHeight: "30vh",
            }}
            fluid
          >
            <Container className="pt-4">
              <h1 className="text-light title-text">
                Are you ready to make your Last Bad Decision?
              </h1>
              <p className="text-light">
                {enquiryType === "general"
                  ? `Send us your details and questions regarding any of our services. We will follow up via e-mail as soon as posible. Let´s get this party started!`
                  : enquiryType === "plan"
                  ? `Your Plan is attached to this enquiry. Please fill in your details and feel free to clarify any doubts regarding any of our services using the form bellow. Remember that your plan is not binding and therefore it can be altered once we get in touch. We will follow up via e-mail as soon as possible. Let's get this party started!`
                  : `Send us your details and questions regarding our ${enquiryType} activity, we will follow up via e-mail as soon as possible. Let´s get this party started!`}
              </p>

              {plan.length !== 0 && enquiryType !== "plan" && (
                <Button variant="outline-light" onClick={handleTogglePlan}>
                  Add Your Plan to this Enquiry
                </Button>
              )}
              {enquiryType === "plan" && router.query.type !== "plan" && (
                <Button variant="danger" size="" onClick={handleTogglePlan}>
                  Remove your plan
                </Button>
              )}
            </Container>
          </Jumbotron>
          <Container>
            <Form onSubmit={handleSubmit}>
              <Form.Group
                as={Row}
                className="text-center text-lg-left justify-content-center"
              >
                <Col lg={6} className="mb-2">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First Name (required)"
                    onChange={handleChange}
                    id="first"
                    required
                  />
                </Col>
                <Col lg={6} className="mb-2">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last Name (required)"
                    onChange={handleChange}
                    id="last"
                    required
                  />
                </Col>
                <Col lg={6} className="mb-2">
                  <Form.Label>E-Mail Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="E-mail (required)"
                    onChange={handleChange}
                    id="email"
                    required
                  />
                </Col>
                <Col lg={6} className="mb-2">
                  <Form.Label>Phone Contact</Form.Label>
                  <Form.Control
                    type="phone"
                    placeholder="Phone with Country Code (required)"
                    onChange={handleChange}
                    id="phone"
                    required
                  />
                </Col>
                <Col lg={6} className="mb-2">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Country"
                    onChange={handleChange}
                    id="country"
                  />
                </Col>
                <Col lg={6} className="mb-2">
                  <Form.Label>Group Size</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Max. number of participants throughout the stay"
                    onChange={handleChange}
                    id="maxPx"
                  />
                </Col>
                <Col lg={12} className="mb-3">
                  <Form.Label>Ask us what you need to know!</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={info.enquiry}
                    onChange={handleChange}
                    id="enquiry"
                    style={{ height: "20em" }}
                  />
                  {enquiryType === "plan" && (
                    <>
                      <Alert className="h5 mt-2" variant="secondary">
                        Your current plan has {plan.length}{" "}
                        {plan.length === 1 ? "activity" : "activities"} and a
                        total price estimate of {planPrice}€
                      </Alert>
                    </>
                  )}
                </Col>
                <Col lg="3" sm="6" className="mb-2 text-center">
                  <h6>Start Date</h6>
                  <DatePicker
                    autoComplete="off"
                    selected={info["start-date"]}
                    onChange={(date) => {
                      if (info["end-date"] && info["end-date"] < date) {
                        setInfo({
                          ...info,
                          "end-date": date,
                          "start-date": date,
                        })
                      } else {
                        setInfo({ ...info, "start-date": date })
                      }
                    }}
                    id="start-date"
                  />
                </Col>
                <Col lg="3" sm="6" className="mb-2 text-center">
                  <h6>End Date</h6>
                  <DatePicker
                    autoComplete="off"
                    selected={info["end-date"]}
                    onChange={(date) => {
                      if (info["start-date"] && info["start-date"] > date) {
                        setInfo({
                          ...info,
                          "end-date": date,
                          "start-date": date,
                        })
                      } else {
                        setInfo({ ...info, "end-date": date })
                      }
                    }}
                    id="end-date"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="justify-content-center">
                <Col lg="6" className="text-center">
                  <Button type="submit" disabled={submitted}>
                    Submit your enquiry
                  </Button>
                  {submitted && (
                    <>
                      <Alert className="h5 mt-2" variant="success">
                        Your enquiry has been sent, we will get in touch with
                        you shortly!
                      </Alert>
                    </>
                  )}
                </Col>
              </Form.Group>
            </Form>
          </Container>
        </div>
      </Fade>
    </>
  )
}

export default EnquireScreen
