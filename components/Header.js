import React, { useContext } from 'react'
import { PlanContext } from "../contexts/PlanContext.js"
import { Navbar, Nav, Badge, Container } from 'react-bootstrap'
import Link from 'next/link'
import { CopyToClipboard } from 'react-copy-to-clipboard'


const Header = () => {
  const { plan } = useContext(PlanContext)

  return (
    <>
      <Navbar variant="light" bg="secondary" expand="md" fixed="top" collapseOnSelect className="m-0 px-0 pb-2 pt-4 shadow-sm">
        <Container>
          <Link href='/'>
            <Navbar.Brand id='brand'>
              <img src="/images/logo.png" alt="logo.png" className="d-inline-block align-top my-n2" height="45px"></img>
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="">
              <Link href='/' passHref><Nav.Link className="px-2 d-flex h5 m-0 align-items-center justify-content-center text-center">Home</Nav.Link></Link>
              <Link href='/about' passHref><Nav.Link className="px-2 d-flex h5 m-0 align-items-center justify-content-center text-center">ABOUT US</Nav.Link></Link>
              <Link href='/activities' passHref><Nav.Link className="px-2 d-flex h5 m-0 align-items-center justify-content-center text-center">ACTIVITIES</Nav.Link></Link>
              <Link href='/enquire/general' passHref><Nav.Link className="p-2 d-flex h5 my-0 align-items-center bg-info text-light justify-content-center text-center">Enquire Now!</Nav.Link></Link>
            </Nav>
            <Link href='/plan' passHref><Nav.Link className="ml-auto px-2 d-flex h5 m-0 align-items-center justify-content-center text-center">YOUR PLAN <Badge variant="info" className="rounded">{plan.length}</Badge></Nav.Link></Link>
          </Navbar.Collapse>
        </Container>
      </Navbar >
      <Navbar variant="primary" bg="primary" fixed="top" className="m-0 p-0" style={{
        height: "1.5em"
      }}>
        <Container style={{ fontSize: "0.8em" }}>
          <a className="ml-auto text-light  thin-text mt-0 mb-1 mr-4" target="blank" href="https://api.whatsapp.com/send?phone=351914054039&text=Hi!%20I%27m%20interested%20in%20some%20of%20the%20Last%20Bad%20Decision%20activities."><span><i className="fa fa-whatsapp" /> +351 914 054 039</span></a>
          <CopyToClipboard text="lisbon@lastbaddecision.com" style={{ cursor: "pointer" }}>
            <span className="text-light thin-text mt-0 mb-1 mr-4 text-lowercase"><i className="far fa-envelope"></i> lisbon@lastbaddecision.com</span>
          </CopyToClipboard>
        </Container>
      </Navbar>
    </>

  )
}

export default Header
