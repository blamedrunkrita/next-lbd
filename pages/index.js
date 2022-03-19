import Head from "next/head"
import { connectToDatabase } from "../util/mongodb"
import {
  Jumbotron,
  Button,
  Container,
  Fade,
  Row,
  Col,
  Image,
} from "react-bootstrap"
import Link from "next/link"
import ProductCarousel from "../components/ProductCarousel"

export default function Home(props) {
  const products = props.activities

  return (
    <>
      <Head>
        <title>LBD | Stag, Hen and Group Activities in Lisbon</title>
        <meta
          name="description"
          content="Craziest Tailored Stag, Hen and Group Weekends in Lisbon"
        />
      </Head>

      <main>
        <Fade appear={true} in={true}>
          <div id="home">
            <section id="hero-section">
              <Jumbotron
                className="text-center d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: "#FFF",
                  backgroundSize: "cover",
                  height: "100vh",
                  overflow: "hidden",
                }}
                fluid
              >
                <video playsInline autoPlay muted loop height="inherit">
                  <source src="/videos/Video_LBD.mp4" type="video/mp4"></source>
                </video>

                <Container className="position-absolute">
                  <h1 className="text-light mb-3 title-text">
                    Tailored Stag, Hen and Group Weekends in Lisbon
                  </h1>
                  <Link href="/activities">
                    <Button variant="outline-light" as="h3">
                      discover our activities
                    </Button>
                  </Link>
                </Container>
                <a
                  className="d-inline-block align-top my-n2 position-absolute"
                  style={{ top: "10%", right: 0, height: "25%" }}
                  href="https://thawards.com/?p=242217"
                  target={"_blank"}
                >
                  <img
                    src="/images/2020-winners-badge.png"
                    alt="logo.png"
                    height="100%"
                  ></img>
                </a>
              </Jumbotron>
            </section>
            <section id="best-activities-section" className="text-center my-5">
              <Container>
                <h2 className="text-center title-text">Our best ideas</h2>
                <ProductCarousel products={products} />
              </Container>
            </section>
            <section id="why-lisbon-section">
              <Jumbotron
                className="px-sm-0 px-md-4 py-5 text-center mb-2"
                style={{
                  background:
                    'url("/images/hero_why_lisbon.jpg") no-repeat center',
                  backgroundSize: "cover",
                }}
              >
                <Container>
                  <h2 className="py-3 text-light title-text">Why Lisbon?</h2>
                  <h4 className="text-light">
                    Lisbon is the cheapest city break destination in Western
                    Europe. Your low budget will take you a long way, especially
                    if you have our help.{" "}
                  </h4>
                  <p className="h4 pb-3 text-light d-none d-sm-inline">
                    Lisbon is ageless and authentic, full of bohemian and trendy
                    places where people share all kinds of lifestyles. At night
                    the streets come alive with music and wild crowds that don’t
                    dissipate until morning. The sun shines 290 days a year
                    making Lisbon the sunniest capital in Europe. Its location
                    and the fact that the temperature rarely drops below 15ºC
                    creates the perfect balance between beach and city life, and
                    the most versatile scenery to fulfil any stag or hen weekend
                    dream.
                  </p>
                </Container>
              </Jumbotron>
            </section>
            <section id="how-to-section" className="text-center my-5">
              <Container>
                <h2 className="title-text">
                  How to book with Last Bad Decision?
                </h2>
                <h4>It's so easy our grandmas could do it!</h4>
                <Row className="mt-5">
                  <Col sm="4" className="mb-3 px-1">
                    <Image src="/images/how_to1.png" height="85em" />
                    <h4>The fun part</h4>
                    <p className="h4">
                      Browse our activities, create & customize your perfect
                      plan and get an instant quote estimate.
                    </p>
                  </Col>
                  <Col sm="4" className="mb-3 px-1">
                    <Image
                      src="/images/how_to2.png"
                      height="85em"
                      className="p-2"
                    />
                    <h4>Booking Confirmation</h4>
                    <p className="h4">
                      Send us your enquiry, get a final quote and make a small
                      deposit to secure your reservation.
                    </p>
                  </Col>
                  <Col sm="4" className="mb-3 px-1">
                    <Image
                      src="/images/how_to3.png"
                      height="85em"
                      className="p-3"
                    />
                    <h4>Pay Later</h4>
                    <p className="h4">
                      Make changes and adjustments without extra costs and pay
                      closer to arrival.
                    </p>
                  </Col>
                </Row>
              </Container>
            </section>
            <section id="why-us-section">
              <Jumbotron
                className="px-sm-1 px-md-4 pt-5 text-center mb-n4 "
                style={{
                  background: 'url("/images/hero_why_us.jpg") no-repeat center',
                  backgroundSize: "cover",
                }}
              >
                <Container>
                  <h2 className="text-light title-text py-3">Why Us?</h2>
                  <h4 className="text-light">
                    We are the only Local Weekend Organisers specialised in Stag
                    & Hen Parties in Lisbon!
                  </h4>
                  <p className="h4 text-light h5-sm d-none d-sm-block">
                    By skipping the middleman and booking directly with a local
                    organiser you will save a lot of money. Besides, we know
                    Lisbon first hand and we can advise you better than anyone
                    about the best deals and experiences. Communication will be
                    straightforward and changes will be hassle-free, even when
                    it’s last minute.
                  </p>
                  <Link href="/activities">
                    <Button variant="outline-light" as="h3" className="mt-4">
                      discover our activities
                    </Button>
                  </Link>
                </Container>
              </Jumbotron>
            </section>
          </div>
        </Fade>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const { db } = await connectToDatabase()
  const activities = await db.collection("activities").find({}).toArray()

  return {
    props: {
      activities: JSON.parse(JSON.stringify(activities)),
    },
    revalidate: 120,
  }
}
