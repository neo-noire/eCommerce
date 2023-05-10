import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SliderComponent } from "./Slider/Slider";
import { ParalaxComponent } from "./Paralax/Paralax";
import { MainPageSlider } from "./MainPageSlider/MainPageSlider";
import { data } from "../../../features/constants";
import { CatCard } from "../../CatCard/CatCard";
import { SwiperSlide } from "swiper/react";
import { NewsCard } from "../../NewsCard/NewsCard";

export const MainPage = () => {
  const image = [
    {
      url: "https://static.zara.net/photos///contents/mkt/spots/ss23-north-man-new/subhome-xmedia-17-2//w/2388/IMAGE-landscape-fill-cc6ffc96-7bee-4c99-ace1-dd6003920a27-default_0.jpg?ts=1682680992864",
    },
    "https://asset20.ckassets.com/blog/wp-content/uploads/sites/5/2021/12/Womens-Clothing.jpg",
  ];
  return (
    <>
      <SliderComponent />
      <MainPageSlider>
        {data.map((el) => (
          <SwiperSlide key={el.id}>
            <CatCard {...el} />
          </SwiperSlide>
        ))}
      </MainPageSlider>
      <ParalaxComponent type="featured" url={image[0].url} />
      <div className="container">
        <h2 className="title">Fashion Blog:</h2>
        <MainPageSlider isNews={true}>
          {data.map((el, idx) => (
            <SwiperSlide key={el.id}>
              <NewsCard nth={(idx + 1) % 2 === 0} />
            </SwiperSlide>
          ))}
        </MainPageSlider>
      </div>
      <ParalaxComponent type="trending" url={image[1]} />
    </>
  );
};
