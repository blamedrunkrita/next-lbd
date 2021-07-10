import React, { useEffect, useState } from 'react'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const AutoGallery = ({ product }) => {
  const [images, setImages] = useState(null)

  useEffect(() => {
    console.log("GENERATED")
    console.log(product)
    if (product.images && product.images.length > 0) {
      setImages(
        product.images.map((url, index) => {
          return (
            {
              original: `${url}`,
              thumbnail: `${url}`,
              originalAlt: product.name + "-" + index,
              thumbnailAlt: product.name + "-thumb" + index
            }
          )
        }
        ))
    }
    console.log(product.images)
  }, [product])


  return (
    images ? <ImageGallery items={images} /> : "WHAT IS GOING ON"
  )
}

export default AutoGallery
