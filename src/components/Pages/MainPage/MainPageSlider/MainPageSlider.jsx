import React, { useEffect, useState } from "react";
import { Swiper } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import s from "./NewsSlider.module.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useSliderHook } from "../../../../hooks/useSliderHook";

export const MainPageSlider = ({ children, data, isNews = false }) => {
  const [active, setActive] = useState(0);
  const [swiper, setSwiper] = useState(null);
  const slidesPerScreen = useSliderHook(isNews);

  return (
    <section className={s.wrapper}>
      <Swiper
        modules={[Pagination]}
        spaceBetween={16}
        slidesPerView={slidesPerScreen}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => {
          setSwiper(swiper);
        }}
        onActiveIndexChange={(swiper) => {
          setActive(swiper.activeIndex);
        }}
      >
        {children}
      </Swiper>

      <div className={s.buttonWrapper}>
        {active !== 0 && (
          <button
            className={s.buttonLeft}
            onClick={() => {
              swiper.slidePrev();
            }}
          >
            <ArrowBackIosNewIcon />
          </button>
        )}
        {active !== swiper?.slides?.length - Math.floor(slidesPerScreen) && (
          <button
            className={s.buttonRight}
            onClick={() => {
              swiper.slideNext();
            }}
          >
            <ArrowForwardIosIcon />
          </button>
        )}
      </div>
    </section>
  );
};
