import React, { useRef, useState } from "react";
import { useParams } from "react-router";
import s from "./Product.module.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useFetch from "../../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../../store/cartSlice/cartSlice";
import {
  addToFav,
  openFav,
} from "../../../store/favouriteSlice/favouriteSlice";
import { useMediaQuery } from "@mui/material";
import { Counter } from "./Counter";

export const Product = () => {
  const prodId = useParams().id;
  const mobile = useMediaQuery(`(max-width: 768px)`);
  const { data, loading } = useFetch(`/products/${prodId}?populate=*`);
  const [img, setImg] = useState("img");

  //order counter for cart
  const inpRef = useRef();

  //add to cart
  const dispatch = useDispatch();
  const cartHandler = () => {
    const order = {
      id: data.id,
      quantity: parseInt(inpRef?.current?.value) || 1,
      title: data.attributes.title,
      desc: data.attributes.description,
      price: data.attributes.price,
      img: data?.attributes?.img?.data?.attributes?.url,
    };
    dispatch(add(order));
  };
  //Favourites
  const favList = useSelector((state) => state.favStore.favourite);
  //add to favorites
  const addToFavourites = () => {
    const favItem = {
      id: data.id,
      title: data.attributes.title,
      desc: data.attributes.description,
      price: data.attributes.price,
      img: data?.attributes?.img?.data?.attributes?.url,
    };

    dispatch(addToFav(favItem));
  };

  const openFavHandler = () => {
    dispatch(openFav());
  };

  return (
    <div className={s.container}>
      {loading ? (
        " Loading... "
      ) : (
        <>
          <div className={s.left}>
            <div className={s.imgSmall}>
              <img
                onClick={() => setImg("img")}
                src={data?.attributes?.img?.data?.attributes?.url}
                alt="one"
              />
              <img
                onClick={() => setImg("img2")}
                src={data?.attributes?.img2?.data?.attributes?.url}
                alt="one"
              />
              <img
                onClick={() => setImg("img3")}
                src={data?.attributes?.img3?.data?.attributes?.url}
                alt="one"
              />
            </div>
            <div className={s.imgBig}>
              <img src={data?.attributes[img].data?.attributes?.url} alt="" />
            </div>
          </div>
          <div className={s.right}>
            <div className={s.desc}>
              <h2 className={s.productTitle}>{data?.attributes?.title}</h2>
              <div className={s.price}>$ {data?.attributes?.price}</div>
              <p className={s.productText}>{data?.attributes?.description}</p>
              {!mobile && <Counter inputRef={inpRef} />}
              <button className={s.cartBtn} onClick={cartHandler}>
                <AddShoppingCartIcon />
                <span>Add to cart</span>
              </button>
              <div className={s.sublists}>
                {loading ? (
                  "Loading..."
                ) : favList?.find((el) => el.id === data?.id) ? (
                  <span onClick={openFavHandler}>
                    <FavoriteIcon />
                    {!mobile && <>Go to wish list</>}
                  </span>
                ) : (
                  <span onClick={addToFavourites}>
                    <FavoriteBorderIcon />
                    {!mobile && <>Add to wish list</>}
                  </span>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
