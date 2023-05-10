import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import s from './Navbar.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { openMenu } from '../../../store/menuSlice/menuSlice'
import { openFav } from '../../../store/favouriteSlice/favouriteSlice';
import { openCart } from '../../../store/cartSlice/cartSlice';
import logo from '../../../assets/logo.png'


export const Navbar = () => {
  const dispatch = useDispatch()

  const products = useSelector(state => state.cartStore.cart)
  const favStore = useSelector(state => state.favStore.favourite)

  const menuHandler = () => {
    dispatch(openMenu())
  }

  const favHandler = () => {
    dispatch(openFav())
  }

  const cartHandler = () => {
    dispatch(openCart())
  }

  return (
    <header className={s.wrapper}>
      <div className={s.navbar}>
        <div className={s.left}>
          <button className={s.burgerBtn} onClick={menuHandler}><MenuRoundedIcon /></button>
        </div>
        <div className={s.center}>
          <NavLink className={s.logo} to={'/'}>
            <img src={logo} />
          </NavLink>
        </div>
        <div className={s.right}>
          <div className={s.icons}>
            <div className={s.cartIcon}>
              <FavoriteBorderIcon className={s.icon} onClick={favHandler} />
              {
                favStore.length > 0 &&
                <span>{favStore.length}</span>
              }
            </div>

            <div className={s.cartIcon} onClick={cartHandler}>
              <ShoppingCartOutlinedIcon className={s.icon} />
              {
                products.length > 0 &&
                <span>{products.length}</span>
              }
            </div>

          </div>
        </div>
      </div>
    </header >
  )
}
