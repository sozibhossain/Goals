"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-cards"
import "swiper/css/pagination"
import "./carouselStyle.css"
import Image from "next/image"
import { AchiveData } from "@/types/home"

export default function ClientCarousel({ achiveData }: { achiveData: AchiveData }) {
  const slides = [
    {
      id: 1,
      image: `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Achieve/${achiveData?.mbl_img1}`,
      alt: "Mobile app screen 1",
    },
    {
      id: 2,
      image: `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Achieve/${achiveData?.mbl_img2}`,
      alt: "Mobile app screen 2",
    },
    {
      id: 3,
      image: `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Achieve/${achiveData?.mbl_img3}`,
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
        pagination={{ clickable: true }}
        cardsEffect={{
          slideShadows: false,
          perSlideOffset: 20,
          perSlideRotate: 5,
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Image
              src={slide.image}
              alt={slide.alt}
              width={500}
              height={300}
              className="slide-image w-[150px] h-[350px] lg:w-[230px] lg:h-[550px]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
