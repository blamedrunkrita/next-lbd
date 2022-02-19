import Head from "next/head"

import { Container, Fade } from "react-bootstrap"

const iframeStyles = {
  width: "100%",
  border: "none",
  height: "52vh",
}

export default function Home(props) {
  return (
    <>
      <Head>
        <title>LBD | Terms & Conditions</title>
        <meta
          name="description"
          content="Craziest Tailored Stag, Hen and Group Weekends in Lisbon"
        />
      </Head>

      <main>
        <Fade appear={true} in={true}>
          <div id="terms-page">
            <section id="terms&conditions" className="text-center mt-4">
              <Container>
                <h1 className="title-text h3 border-bottom mb-0">
                  Terms & Conditions
                </h1>
                <iframe
                  src={"/terms&conditions.html"}
                  style={iframeStyles}
                ></iframe>
              </Container>
            </section>
          </div>
        </Fade>
      </main>
    </>
  )
}
