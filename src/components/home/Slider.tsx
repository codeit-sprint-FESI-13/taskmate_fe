"use client";

import "swiper/css";
import "swiper/css/pagination";

import { Children, ReactNode } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface SliderProps {
  children: ReactNode;
}

const Slider = ({ children }: SliderProps) => (
  <div className="flex w-full flex-col gap-3.5">
    <Swiper
      slidesPerView={1}
      loop
      pagination={{
        el: ".progress-swiper-pagination",
        clickable: true,
      }}
      modules={[Pagination]}
      spaceBetween={30}
      className="w-full"
    >
      {Children.toArray(children).map((child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </Swiper>

    <div className="progress-swiper-pagination mt-2 flex cursor-pointer items-center justify-center gap-3" />
  </div>
);

export default Slider;
