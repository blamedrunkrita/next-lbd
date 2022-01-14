import { React } from "react"
import { Image, Jumbotron } from "react-bootstrap"
import Link from "next/link"

const Product = ({ product, noDescription, miniature }) => {
  return (
    <div className="shadow-sm">
      <Link href={`/activities/${product._id}`} replace={true} passHref>
        <a>
          <Jumbotron
            style={{ height: "4em" }}
            className="m-0 py-1 px-1 bg-secondary d-flex align-items-center justify-content-center text-center"
          >
            {product.name.length < 35 && !miniature ? (
              <h5 className="m-0">{product.name}</h5>
            ) : miniature ? (
              <h6 className="m-0">{product.name}</h6>
            ) : (
              <h5 className="m-0">{product.name}</h5>
            )}
          </Jumbotron>
          <div>
            {product.bestSeller && !miniature && (
              <Image
                src={"images/best_seller.png"}
                height="35em"
                style={{
                  position: "absolute",
                  top: "3.3em",
                  right: "-0.8em",
                  transform: "rotate(5deg) scale(0.7)",
                }}
              ></Image>
            )}
            <Image priority src={product.images[0]} fluid></Image>
            <p
              className="text-right px-1 position-absolute bg-info text-light"
              style={{
                position: "absolute",
                transform: "translate(0%, -100%)",
              }}
            >
              from{" "}
              <span className="text-light h5 text-end">
                {product.minPrice
                  ? product.minPrice + "€"
                  : product.pricePP
                  ? product.priceFrom + "€ pp"
                  : product.priceFrom + "€"}
              </span>
            </p>
          </div>
          {!noDescription && (
            <p className="m-0 px-3 pt-2 pb-1" style={{ fontSize: "0.8em" }}>
              {product.description_short}
            </p>
          )}
        </a>
      </Link>
    </div>
  )
}

export default Product
