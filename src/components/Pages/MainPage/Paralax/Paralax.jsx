import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import s from "./Paralax.module.css";
import { Parallax } from "react-parallax";
import { Parallax as ScrollParallax } from "react-scroll-parallax";
import { NavLink } from "react-router-dom";
import { FeaturedProducts } from "../FeaturedProducts/FeaturedProducts";

export const ParalaxComponent = ({ type, url }) => {
  const [titleProgress, setTitleProgress] = useState(null);
  const [cardsProgress, setCardsProgress] = useState(null);

  return (
    <section className={s.wrapper}>
      <Parallax
        blur={{ min: -15, max: 18 }}
        bgImage={url}
        bgImageAlt="the cat"
        strength={200}
      >
        <div className={s.paralaxContainer}>
          <ScrollParallax
            onProgressChange={(progress) => setTitleProgress(progress)}
            speed={20}
            // from up to down
            //  translateY={[-100, 110]}
            // from down to up
            translateY={[150, 0]}
          >
            <div
              className={`${s.parallaxText} ${
                titleProgress >= 0.4 && s.opacity
              }`}
            >
              <h1>{type.toUpperCase()}</h1>
              <p>
                Our newest spring colors are here. This season we're grounding
                our colors in warm, mineral-based natural tones inspired by the
                earth around us and the sky above.
              </p>
            </div>
          </ScrollParallax>
        </div>
        <ScrollParallax
          onProgressChange={(progress) => setCardsProgress(progress)}
          speed={0}
          // translateX={[-10, 10]}
        >
          <div
            className={`${s.parallaxCards} ${
              cardsProgress > 0.2 && s.cardsOpacity
            }`}
          >
            <FeaturedProducts type={type} />
          </div>
        </ScrollParallax>
      </Parallax>
    </section>
  );
};

{
  /* <ParallaxBanner
                layers={[
                    { image: 'https://www.patagonia.com/blog/wp-content/uploads/2022/01/kearns-t-0015-cc-web-2250x1066-1.jpg.webp', speed: -20 },
                    {
                        speed: 15,
                        children: (
                            <div className={s.anotherContainer}>
                                <h1>Hello World!</h1>
                            </div>
                        ),
                    },
                    // {image: 'https://www.patagonia.com/blog/wp-content/uploads/2022/01/kearns-t-0015-cc-web-2250x1066-1.jpg.webp', speed: -10 },
                ]}
            className={s.textContainer}
            >
            <Para translateY={[4000, 1000]}>

                <div className={s.anotherContainer}>
                    <h1>Hello World!</h1>
                </div>
            </Para>
        </ParallaxBanner> */
}
