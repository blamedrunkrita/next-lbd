import React from 'react'
import Carousel from 'react-multi-carousel';
import Product from './Product.js'
import "react-multi-carousel/lib/styles.css";


const ProductCarousel = ({ products }) => {

  return (
    <div >
      <Carousel
        swipeable={true}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={false} // means to render carousel on server-side.
        infinite={true}
        keyBoardControl={true}
        transitionDuration={500}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        autoPlay={true}
      >
        {products && products.filter(product => product.bestSeller).map(product => {
          return (
            <div className="mx-1">
              <Product product={product} noDescription={true} miniature={true} />
            </div>)
        })}
      </Carousel>

    </div>
  )
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  }
};

export default ProductCarousel
