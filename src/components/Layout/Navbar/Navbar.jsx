import React, { useEffect, useState } from 'react'
import { NavLink as Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import s from './Navbar.module.css'
import { Cart } from './Cart/Cart';
import { useSelector } from 'react-redux';
import { routerIds } from '../../../router/routerIds'
import { Favourites } from './Favourites/Favourites';
import useAuth from '../../../hooks/useAuth';
import { Account } from './Account/Account';


export const Navbar = () => {
  const [openCart, setOpenCart] = useState(false)
  const [openFav, setOpenFav] = useState(false)
  const [openAcc, setOpenAcc] = useState(false)
  const products = useSelector(state => state.cartStore.cart)
  const favStore = useSelector(state => state.favStore.favourite)

  //custom hook for checking if user is auth
  const jwt = useSelector(state => state?.userStore?.user?.jwt)
  
  const { avatar } = useAuth(jwt);
  const [userPic, setUserPic] = useState(null)

  useEffect(() => {
    if (avatar) {
      setUserPic(process.env.REACT_APP_UPLOAD_URL + avatar?.url)
    }
  }, [avatar])

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
              ? <FavoriteIcon className={s.icon} onClick={() => setOpenFav(prev => !prev)} />
              : <FavoriteBorderIcon className={s.icon} onClick={() => setOpenFav(prev => !prev)} />

          }
          <div className={s.cartIcon} onClick={() => setOpenCart(prev => !prev)}>
            <ShoppingCartOutlinedIcon className={s.icon} />
            <span>{products.length}</span>
          </div>
        </div>
      </div>
      {openAcc && <Account setUserPic={setUserPic} setAcc={setOpenAcc} url={userPic} />}
      {openFav && <Favourites setOpenFav={setOpenFav} />}
      {openCart && <Cart setOpenCart={setOpenCart} />}
    </nav>
  )
}
