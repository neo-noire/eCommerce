import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import s from './Navbar.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { routerIds } from '../../../router/routerIds'
import useAuth from '../../../hooks/useAuth';
import { Account } from './Account/Account';
import { useMediaQuery } from '@mui/material';
import { openMenu } from '../../../store/menuSlice/menuSlice'
import { openFav } from '../../../store/favouriteSlice/favouriteSlice';
import { openCart } from '../../../store/cartSlice/cartSlice';
import logo from '../../../assets/logo.png'


export const Navbar = () => {
  const dispatch = useDispatch()
  const desctopOff = useMediaQuery(`(max-width: 992px)`)

  const [openAcc, setOpenAcc] = useState(false)
  const products = useSelector(state => state.cartStore.cart)
  const favStore = useSelector(state => state.favStore.favourite)
  const jwt = useSelector(state => state?.userStore?.user?.jwt)


  //custom hook for checking if user is auth
  const { avatar } = useAuth(jwt);
  const [userPic, setUserPic] = useState(null)

  useEffect(() => {
    if (avatar) {
      setUserPic(avatar?.url)
    }
  }, [avatar])

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
    <nav className={s.navbar}>
      {
        desctopOff
          ? <button className={s.burgerBtn} onClick={menuHandler}><MenuRoundedIcon /></button>
          : <div className={s.left}>
            <NavLink className={({ isActive }) => isActive ? `${s.link}` : undefined}
              to={`/products/${routerIds.men}`}>Men</NavLink>
            <NavLink className={({ isActive }) => isActive ? `${s.link}` : undefined}
              to={`/products/${routerIds.women}`}>Women</NavLink>
            <NavLink className={({ isActive }) => isActive ? `${s.link}` : undefined}
              to={`/products/${routerIds.children}`}>Childred</NavLink>
            <NavLink className={({ isActive }) => isActive ? `${s.link}` : undefined}
              to={`/products/${routerIds.accessories}`}>Accessories</NavLink>
          </div>
      }
      <div className={s.center}>
        <NavLink className={s.logo} to={'/'}>
          <img src={logo} />
        </NavLink>
      </div>
      <div className={s.right}>
        {
          !desctopOff &&
          <>
            <NavLink className={({ isActive }) => isActive ? `${s.link}` : undefined} to='/'>Homepage</NavLink>
            <NavLink to='/about'>About</NavLink>
            <NavLink to='/contact'>Contact</NavLink>
          </>
        }

        <div className={s.icons}>
          {
            !desctopOff &&
            <>
              <div className={s.icon}>
                {
                  jwt
                    ? <div onClick={() => setOpenAcc(prev => !prev)}>
                      {userPic
                        ? <div className={s.avatar}>
                          <img src={userPic}
                            alt='user avatar' />
                        </div>
                        : <AccountCircleIcon />}
                    </div>
                    : <NavLink to='/auth'>
                      <AccountCircleIcon className={s.icon} />
                    </NavLink>

                }
              </div>
              <div className={s.cartIcon}>
                {
                  favStore.length !== 0
                    ? <FavoriteIcon className={s.icon} onClick={favHandler} />
                    : <FavoriteBorderIcon className={s.icon} onClick={favHandler} />

                }
              </div>
            </>
          }
          <div className={s.cartIcon} onClick={cartHandler}>
            <ShoppingCartOutlinedIcon className={s.icon} />
            {
              products.length > 0 &&
              <span>{products.length}</span>
            }
          </div>

        </div>
      </div>
      {openAcc && <Account setUserPic={setUserPic} setAcc={setOpenAcc} url={userPic} />}
    </nav >
  )
}
