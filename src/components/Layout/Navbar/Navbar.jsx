import React from 'react'
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Dropdown } from '../Dropdown/Dropdown'
import s from './Navbar.module.css'

export const Navbar = () => {


  return (
    <nav className={s.navbar}>
      <div className={s.left}>
        <Dropdown trigger={<div>EN/UA</div>}
          menu={[
            "English",
            "Ukrainian",
          ]} />
        <Dropdown pdown trigger={<div>USD</div>}
          menu={[
            "USD",
            "GBP",
            "UAH"
          ]} />
        <Link to='/products/1'>Men</Link>
        <Link to='/products/2'>Women</Link>
        <Link to='/products/3'>Childred</Link>
        <Link to='/products/4'>Accessories</Link>
      </div>
      <div className={s.center}>
        <Link to='/'><h1>MykolaSHOP</h1></Link>
      </div>
      <div className={s.right}>
        <Link to='/'>Homepage</Link>
        <Link to='/about'>About</Link>
        <Link to='/contact'>Contact</Link>
        <Link to='/store' >Store</Link>
        <div className={s.icons}>
          <SearchIcon />
          <PersonIcon />
          <FavoriteBorderIcon />
          <div className={s.cartIcon}>
            <ShoppingCartOutlinedIcon />
            <span>0</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
