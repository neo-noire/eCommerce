import React from "react";
import style from "./NewsCard.module.css";
import { NavLink } from "react-router-dom";

export const NewsCard = ({ nth = true }) => {
  return (
    <div
      className={
        nth ? `${style.cardContainer} ${style.nth}` : style.cardContainer
      }
    >
      <div className={style.cardInner}>
        <div className={style.hovered}>
          <h2 className={style.cardTitle}>Chumash Powered </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consectetur, natus.
          </p>
        </div>
        <NavLink className={style.linkButton}>4 min Read</NavLink>
      </div>
      <div className={style.cardImg}>
        <img src="https://www.patagonia.com/blog/wp-content/uploads/2023/04/schwemmer-r-0001-cc-web-1170x1410-1-414x499.jpg.webp" />
      </div>
    </div>
  );
};
