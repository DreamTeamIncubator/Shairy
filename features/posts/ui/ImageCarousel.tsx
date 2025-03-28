'use client'

import { useState } from 'react'
import s from './ImageCarousel.module.scss'
import clsx from 'clsx'
import Image from 'next/image'

type ImageCarouselType = {
  images: { url: string }[]
}

const ImageCarousel = ({ images }: ImageCarouselType) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!images || images.length === 0) return null

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  return (
    <div className={s.carouselContainer}>
      {images.length > 1 && (
        <Image
          src="/arrowLeft.svg"
          alt="arrowLeft"
          width={48}
          height={48}
          onClick={prevImage}
          className={s.arrowLeft}
        />
      )}

      <Image
        src={images[currentImageIndex].url}
        alt="image"
        className={s.image}
        width={490}
        height={490}
      />

      {images.length > 1 && (
        <Image
          src="/arrowRight.svg"
          alt="arrowRight"
          width={48}
          height={48}
          onClick={nextImage}
          className={s.arrowRight}
        />
      )}

      <div className={s.dotsContainer}>
        {images.map((_, index) => (
          <span
            key={index}
            className={clsx(s.dot, { [s.activeDot]: index === currentImageIndex })}
            onClick={() => setCurrentImageIndex(index)}></span>
        ))}
      </div>
    </div>
  )
}

export default ImageCarousel
