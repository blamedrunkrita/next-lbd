import React from "react"
import { Container, Jumbotron, Image, Nav } from "react-bootstrap"
import Link from "next/link"

const Footer = () => {
  return (
    <footer id="footer">
      <Jumbotron className="bg-primary mb-0 px-0 pt-2 pb-1">
        <Container className="text-center text-secondary">
          <div className="mb-2" style={{ fontSize: "2.5em" }}>
            <a
              className="mx-5"
              target="blank"
              href="https://www.facebook.com/lastbaddecision/"
            >
              <i className="fa fa-facebook-square text-light" />
            </a>
            <a
              className="mx-5"
              target="blank"
              href="https://www.instagram.com/lastbaddecision/?hl=pt"
            >
              <i className="fa fa-instagram text-light" />
            </a>
            <a
              className="mx-5"
              target="blank"
              href="https://api.whatsapp.com/send?phone=351914054039&text=Hi!%20I%27m%20interested%20in%20some%20of%20the%20Last%20Bad%20Decision%20activities."
            >
              <i className="fa fa-whatsapp text-light" />
            </a>
          </div>

          <Nav className="justify-content-center h6 mt-2">
            <Nav.Item>
              <Link href="/" passHref>
                <Nav.Link className="text-light">Home</Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href="/activities" passHref>
                <Nav.Link className="text-light">Activities</Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href="/about" passHref>
                <Nav.Link className="text-light">About Us</Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href="/plan" passHref>
                <Nav.Link className="text-light">Your Plan</Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href="/enquire/general" passHref>
                <Nav.Link className="text-light">Enquiry</Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href="/terms" passHref>
                <Nav.Link className="text-light">Terms & Conditions</Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href="/privacy" passHref>
                <Nav.Link className="text-light">Privacy Policy</Nav.Link>
              </Link>
            </Nav.Item>
          </Nav>
          <br></br>
          <Image src="/images/logo_white.png" alt="logo-white" height="50" />
          <p id="signature" className="mt-3 text-light">
            Developed by | <span className="text-secondary">MarioJS</span>
          </p>
        </Container>
      </Jumbotron>
    </footer>
  )
}

export default Footer
