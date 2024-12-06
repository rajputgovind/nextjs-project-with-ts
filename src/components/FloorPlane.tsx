'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'



const images = [
  { src: '/loft.png', alt: '1 Bedroom + Study' },
  { src: '/loft.png', alt: '1 Bedroom Loft' },
  { src: '/loft.png', alt: '1 Bedroom Suite' },
 

]

export default function Component() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const modalRef = useRef<HTMLDivElement>(null)

  const handleImageClick = (index: number) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const settings = {
    initialSlide: currentIndex,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  }

  return (
    <div className="container mx-auto  py-8">
      <div className="space-y-8">
      <h2 className="border-l-[3px] pl-4 border-l-[#EF2BA0] text-[36px] font-semibold mb-10">Floor Plane</h2>

        {images.map((image, index) => (
            <div key={index}>
      <h2 className="text-[22px] text-[#0B0B0B] font-medium mb-5">{image.alt}</h2>

          <div  className="">
          
            <Image
              src={image.src}
              alt={image.alt}
              width={900}
              height={500}
              className="rounded-lg cursor-pointer"
              onClick={() => handleImageClick(index)}
            />
            </div>
          </div>
        ))}
       
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={modalRef} className="relative w-full max-w-5xl p-8 bg-transparent">
            <Slider {...settings}>
              {images.map((image, index) => (
                <div key={index} className="flex justify-center md:w-[800px] md:h-[500px]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={800}
                    height={600}
                    className="rounded-xl object-cover w-full h-full"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  )
}