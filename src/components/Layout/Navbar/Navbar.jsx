import React, { useEffect, useState } from 'react'
import { NavLink as Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import s from './Navbar.module.css'
import { Cart } from './Cart/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { routerIds } from '../../../router/routerIds'
import useAuth from '../../../hooks/useAuth';
import { Account } from './Account/Account';
import { useMediaQuery } from '@mui/material';
import { openMenu } from '../../../store/menuSlice/menuSlice'
import { openFav } from '../../../store/favouriteSlice/favouriteSlice';
import { openCart } from '../../../store/cartSlice/cartSlice';

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
          ? <button onClick={menuHandler}><MenuRoundedIcon /></button>
          : <div className={s.left}>
            <Link className={({ isActive }) => isActive ? `${s.link}` : undefined}
              to={`/products/${routerIds.men}`}>Men</Link>
            <Link className={({ isActive }) => isActive ? `${s.link}` : undefined}
              to={`/products/${routerIds.women}`}>Women</Link>
            <Link className={({ isActive }) => isActive ? `${s.link}` : undefined}
              to={`/products/${routerIds.children}`}>Childred</Link>
            <Link className={({ isActive }) => isActive ? `${s.link}` : undefined}
              to={`/products/${routerIds.accessories}`}>Accessories</Link>
          </div>
      }
      <div className={s.center}>
        <Link to='/'><h1>MykolaSHOP</h1></Link>
      </div>
      <div className={s.right}>
        {
          !desctopOff &&
          <>
            <Link className={({ isActive }) => isActive ? `${s.link}` : undefined} to='/'>Homepage</Link>
            <Link to='/about'>About</Link>
            <Link to='/contact'>Contact</Link>
          </>
        }

        <div className={s.icons}>
          {
            !desctopOff &&
            <>
              <SearchIcon className={s.icon} />
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
                    : <Link to='/auth'>
                      <AccountCircleIcon className={s.icon} />
                    </Link>

                }
              </div>

              {
                favStore.length !== 0
                  ? <FavoriteIcon className={s.icon} onClick={favHandler} />
                  : <FavoriteBorderIcon className={s.icon} onClick={favHandler} />

              }
            </>
          }
          <div className={s.cartIcon} onClick={cartHandler}>
            <ShoppingCartOutlinedIcon className={s.icon} />
            <span>{products.length}</span>
          </div>

        </div>
      </div>
      {openAcc && <Account setUserPic={setUserPic} setAcc={setOpenAcc} url={userPic} />}
    </nav>
  )
}
