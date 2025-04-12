"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-cards"
import "swiper/css/pagination"
import "./carouselStyle.css"
import Image from "next/image"

export default function ClientCarousel() {
  const slides = [
    {
      id: 1,
      image: "/assets/mobilemockup/mock2.png",
      alt: "Mobile app screen 1",
    },
    {
      id: 2,
      image: "/assets/mobilemockup/mock2.png",
      alt: "Mobile app screen 2",
    },
    {
      id: 3,
      image: "/assets/mobilemockup/mock2.png",
      alt: "Mobile app screen 3",
    },
  ]

  return (
    <div className="carousel-container">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards, Pagination]}
        className="mySwiper"
        pagination={{
          clickable: true
        }}
        cardsEffect={{
            slideShadows: false,
            perSlideOffset: 20, // Increase this for more spacing
            perSlideRotate: 5, // Remove rotation for consistent appearance
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Image
              src={slide.image}
              alt={slide.alt}
              width={300}
              height={400}
              className="slide-image w-[150px] h-[350px] lg:w-[250px] lg:h-[500px]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}