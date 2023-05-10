import React from "react";
import s from "./CatCard.module.css";
import { NavLink } from "react-router-dom";

export const CatCard = ({ category, src, path }) => {
  return (
    <div className={s.cardWrapper}>
      <div className={s.categoryCard}>
        <div className={s.cardImg}>
          <img src={src} alt={category} />
        </div>
        <NavLink to={`/products/${path}`} className={s.cardLink}>
          <span>{category}</span>
          <button>Shop</button>
        </NavLink>
      </div>
    </div>
  );
};
