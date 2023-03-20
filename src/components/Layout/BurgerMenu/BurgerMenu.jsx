import React from 'react'
import s from './BurgerMenu.module.css'
import './menuTransition.css'
import logo from '../../../assets/logo.png'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink } from 'react-router-dom';
import { routerIds } from '../../../router/routerIds';
import { useDispatch, useSelector } from 'react-redux';
import { closeMenu } from '../../../store/menuSlice/menuSlice';
import { openFav } from '../../../store/favouriteSlice/favouriteSlice';
import { openCart } from '../../../store/cartSlice/cartSlice';
import { CSSTransition } from 'react-transition-group'
import useAuth from '../../../hooks/useAuth';
import { removeUser } from '../../../store/userSlice/userSlice';
import { useNestedTransition } from '../../../hooks/useNestedTransition';


export const BurgerMenu = () => {
    const dispatch = useDispatch()
    const avatar = useSelector(state => state.userStore?.user?.avatar)
    const cart = useSelector(state => state.cartStore?.cart)
    const favorite = useSelector(state => state.favStore?.favourite)
    const menuOpen = useSelector(state => state.menu.isOpen)
    const jwt = useSelector(state => state.userStore?.user?.jwt)

    const isAuth = useAuth(jwt)
    const { first, second } = useNestedTransition(menuOpen)
    const closeHandler = () => {
        dispatch(closeMenu())
    }

    const favHandler = () => {
        dispatch(openFav())
        dispatch(closeMenu())
    }

    const cartHandler = () => {
        dispatch(openCart())
        dispatch(closeMenu())
    }

    const logoutHandler = () => {
        dispatch(removeUser())
    }

    return (
        <CSSTransition
            in={first}
            timeout={500}
            classNames='wrapper'
            mountOnEnter
            unmountOnExit
        >
            <div className={s.wrapper} onClick={closeHandler}>
                <CSSTransition
                    in={second}
                    timeout={500}
                    classNames='menu'
                    mountOnEnter
                    unmountOnExit
                >
                    <nav className={s.menu} onClick={(e) => e.stopPropagation()}>
                        <div className={s.top}>
                            <NavLink onClick={closeHandler} className={s.logo} to={'/'}>
                                <img src={logo} />
                            </NavLink>
                            <button onClick={closeHandler}>
                                <CloseRoundedIcon />
                            </button>
                        </div>
                        <div className={s.accountControl}>
                            <div className={s.avatar}>
                                {avatar
                                    ? <img className={s.avatarImg} src={avatar?.url} />
                                    : <AccountCircleIcon className={s.avatarImg} />
                                }
                            </div>
                            {
                                isAuth?.data && jwt
                                    ? <div className={s.user}>
                                        <h3>
                                            Hello {isAuth?.data?.username}!
                                        </h3>
                                        <button className={s.logout} type='button' onClick={logoutHandler}>Log Out</button>
                                    </div>
                                    : < div className={s.account}>
                                        <NavLink onClick={closeHandler} to={'/auth'} className={s.auth}>Register</NavLink>
                                        <NavLink onClick={closeHandler} to={'/login'} className={s.auth}>Login</NavLink>
                                    </div>
                            }
                        </div>
                        <ul className={s.controls}>
                            <li className={s.controlsItem}>
                                <button
                                    onClick={cartHandler}
                                    className={s.controlsBtn}>
                                    <div className={s.icon} >
                                        <ShoppingCartOutlinedIcon />
                                    </div>
                                    Cart
                                    {
                                        cart.length > 0 &&
                                        <span className={s.counter}>{cart.length}</span>
                                    }
                                </button>
                            </li>
                            <li className={s.controlsItem}>
                                <button
                                    onClick={favHandler}
                                    className={s.controlsBtn}>
                                    <div className={s.icon} >
                                        <FavoriteBorderOutlinedIcon />
                                    </div>
                                    Wish List
                                    {
                                        favorite.length > 0 &&
                                        <span className={s.counter}>{favorite.length}</span>
                                    }
                                </button>
                            </li>
                        </ul>
                        <ul className={s.categories}>
                            Categories
                            <li className={s.categoryItem}>
                                <NavLink onClick={closeHandler} to={`/products/${routerIds.men}`}>Men</NavLink>
                            </li>
                            <li className={s.categoryItem}>
                                <NavLink className={({ isActive }) => isActive ? `${s.link}` : undefined}
                                    onClick={closeHandler} to={`/products/${routerIds.women}`}>Women</NavLink>
                            </li>
                            <li className={s.categoryItem}>
                                <NavLink className={({ isActive }) => isActive ? `${s.link}` : undefined}
                                    onClick={closeHandler} to={`/products/${routerIds.children}`}>Childred</NavLink>
                            </li>
                            <li className={s.categoryItem}>
                                <NavLink className={({ isActive }) => isActive ? `${s.link}` : undefined}
                                    onClick={closeHandler} to={`/products/${routerIds.accessories}`}>Accessories</NavLink>
                            </li>
                        </ul>
                        <ul className={s.about}>
                            About Company:
                            <li className={s.aboutItem}>
                                <NavLink className={({ isActive }) => isActive ? `${s.link}` : undefined}
                                    onClick={closeHandler} to={`/about`}>About</NavLink>
                            </li>
                            <li className={s.aboutItem}>
                                <NavLink className={({ isActive }) => isActive ? `${s.link}` : undefined}
                                    onClick={closeHandler} to={`/contacts`}>Contacts</NavLink>
                            </li>
                            <li className={s.aboutItem}>
                                <NavLink className={({ isActive }) => isActive ? `${s.link}` : undefined}
                                    onClick={closeHandler} to={`/delivery`}>Delivery</NavLink>
                            </li>
                        </ul>
                    </nav>
                </CSSTransition>
            </div >
        </CSSTransition >
    )
}
