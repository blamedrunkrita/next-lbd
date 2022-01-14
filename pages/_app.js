import Head from "next/head"
import "bootstrap/dist/css/bootstrap.css"
import "../styles/index.scss"
import Header from "../components/Header"
import Footer from "../components/Footer"
import PlanContextProvider from "../contexts/PlanContext"

import { useRouter } from "next/router"

import { useEffect } from "react"

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter()

  useEffect(() => {
    // some browsers (like safari) may require a timeout to delay calling this
    // function after a page has loaded; otherwise, it may not update the position
    console.log("THIS IS HAPPENING")
    window.scrollTo({ top: 0, behaviour: "smooth" })
  }, [pathname])

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="google-site-verification"
          content="med05raTWcVNROgsjVxvS6gq0DxG8iC1K2gUqE_qVTY"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
          integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w=="
          crossorigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap"
          rel="stylesheet"
        />
        <link rel="preload" as="video" href="/videos/Video_LBD.mp4"></link>
      </Head>
      <PlanContextProvider>
        <div
          id="content"
          className="d-flex flex-column justify-content-between"
        >
          <Header />

          <main
            id="main"
            className="py-3 d-flex flex-column justify-content-between w-100"
          >
            <Component {...pageProps} />
          </main>

          <Footer />
        </div>
      </PlanContextProvider>
    </>
  )
}

export default MyApp
