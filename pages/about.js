import React from "react"
import Head from "next/head"
import {
  Container,
  Jumbotron,
  Fade,
  Row,
  Col,
  Image,
  Alert,
} from "react-bootstrap"

const AboutScreen = () => {
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
              background: "url('/images/about_hero.jpg') no-repeat top center",
              backgroundSize: "cover",
              minHeight: "30vh",
            }}
            fluid
          >
            <Container>
              <h1 className="text-light title-text mt-4">
                The only agency specialised in Stag and Hen parties in Lisbon
              </h1>
            </Container>
          </Jumbotron>
          <Container>
            <h3 className="text-center pt-5">
              You will not just party like a local, you can also party with the
              locals.
            </h3>
            <p className="pb-5 h4 text-center thin-text">
              Last Bad Decision is revolutionizing stag and hen weekends, as
              well as any other group activities in Lisbon giving you the
              opportunity to engage closely with locals and offering an
              authentic experience.
            </p>
            <Row>
              <Col md={{ span: 6, order: "first" }} className="px-4">
                <Image priority src="/images/about_1.jpg" alt="" fluid />
              </Col>
              <Col className="d-flex flex-column justify-content-center px-4">
                <h2 className="title-text text-info my-2">On-Site Reps</h2>
                <h4>
                  There will always be someone you can count on in case of need.
                </h4>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md={{ span: 6, order: "last" }} className="px-4">
                <Image priority src="/images/about_2.jpg" alt="" fluid />
              </Col>
              <Col className="d-flex flex-column justify-content-center px-4 text-md-right">
                <h2 className="title-text text-info my-2 ">
                  Experts in tailoring
                </h2>
                <h4>Specialised in giving life to your craziest ideas.</h4>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md={{ span: 6, order: "first" }} className="px-4">
                <Image priority src="/images/about_3.jpg" alt="" fluid />
              </Col>
              <Col className="d-flex flex-column justify-content-center px-4">
                <h2 className="title-text text-info my-2">Local Based</h2>
                <h4>We actually know first hand what we are offering.</h4>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md={{ span: 6, order: "last" }} className="px-4">
                <Image priority src="/images/about_4.jpg" alt="" fluid />
              </Col>
              <Col className="d-flex flex-column justify-content-center px-4 text-md-right">
                <h2 className="title-text text-info my-2 ">Low Prices</h2>
                <h4>The most competitive prices in Western Europe!</h4>
              </Col>
            </Row>
            <Alert className="mt-4 h4 text-justify thin-text">
              {
                "You’ll never feel abandoned! We have a wide range of young representatives always on-site or at the reach of a text message, be it day or night, to attend your requests and make sure everything runs as expected during your stag do or hen do in Lisbon. They are very close to our suppliers and if there’s any problem they will sort it out.  Our team is responsible, fun, helpful and a bit crazy, but the most important is that we do care if you are happy, and that’s the main reason our rating never dropped below five stars.\n\nWe don’t offer pre-made packs because we learned every group has their own needs. As soon as you contact us you’ll be followed by a dedicated account manager who will analyse the characteristics and preferences of your group and suggest you the best options for your stag do or hen do. Together you will create a tailored programme for the stag party or hen party in Lisbon, within your budget, and that will please everyone.\n\nWe never get lazy! Our team is constantly looking for what’s new and trendy and we experiment first-hand to make sure it’s worth it. We’ll never suggest you tourist traps, or lower quality activities, just because that’s what others are doing. We pride ourselves of knowing even the smallest and offbeat suppliers for stag do or hen do activities in Lisbon and picking only the best of the best. If you don’t see it on our website it’s probably because it’s not worth it. In any case, always ask, there’s very little we can’t make happen."
              }
            </Alert>
          </Container>
        </div>
      </Fade>
    </>
  )
}

export default AboutScreen
