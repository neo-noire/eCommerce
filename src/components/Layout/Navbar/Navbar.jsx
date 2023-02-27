import React, { useState, useEffect } from 'react'
import { NavLink as Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import s from './Navbar.module.css'
import { Cart } from './Cart/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { routerIds } from '../../../router/routerIds'
import { isAuth } from '../../../features/auth/isAuth';
import { Favourites } from './Favourites/Favourites';
import { addInfo } from '../../../store/userSlice/userSlice';


export const Navbar = () => {
  const [openCart, setOpenCart] = useState(false)
  const [openFav, setOpenFav] = useState(false)
  const dispatch = useDispatch()
  const products = useSelector(state => state.cartStore.cart)
  const favStore = useSelector(state => state.favStore.favourite)

  const jwt = useSelector(state => state.userStore.user.jwt)

  useEffect(() => {
    if (jwt) {
      isAuth(jwt)
        .then(
          response => dispatch(addInfo(response))
        )
    }
  }, [jwt])

  return (
    <nav className={s.navbar}>
      <div className={s.left}>
        <Link className={({ isActive }) => isActive ? `${s.link}` : undefined}
          to={`/products/${routerIds.men}`}>Men</Link>
        <Link className={({ isActive }) => isActive ? `${s.link}` : undefined}
          to={`/products/${routerIds.women}`}>Women</Link>
        <Link className={({ isActive }) => isActive ? `${s.link}` : undefined}
          to={`/products/${routerIds.children}`}>Childred</Link>
        <Link className={({ isActive }) => isActive ? `${s.link}` : undefined}
          to={`/products/${routerIds.accessories}`}>Accessories</Link>
      </div>
      <div className={s.center}>
        <Link to='/'><h1>MykolaSHOP</h1></Link>
      </div>
      <div className={s.right}>
        <Link className={({ isActive }) => isActive ? `${s.link}` : undefined} to='/'>Homepage</Link>
        <Link to='/about'>About</Link>
        <Link to='/contact'>Contact</Link>
      
        <div className={s.icons}>
          <SearchIcon className={s.icon} />
          {
            jwt
              ? <AccountCircleIcon className={s.icon} />
              : <Link to='/auth'>
                <AccountCircleIcon className={s.icon} />
              </Link>

          }

          {
            favStore.length !== 0
              ? <FavoriteIcon className={s.icon} onClick={() => setOpenFav(prev => !prev)} />
              : <FavoriteBorderIcon className={s.icon} onClick={() => setOpenFav(prev => !prev)} />

          }
          <div className={s.cartIcon} onClick={() => setOpenCart(prev => !prev)}>
            <ShoppingCartOutlinedIcon className={s.icon} />
            <span>{products.length}</span>
          </div>
        </div>
      </div>
      {openFav && <Favourites setOpenFav={setOpenFav} />}
      {openCart && <Cart setOpenCart={setOpenCart} />}
    </nav>
  )
}
