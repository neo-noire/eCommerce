import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar/Navbar'
import { Footer } from './Footer/Footer'
import { BurgerMenu } from './BurgerMenu/BurgerMenu'
import s from './Layout.module.css'
import { useSelector } from 'react-redux'
import { Favourites } from './Navbar/Favourites/Favourites'
import { Cart } from './Navbar/Cart/Cart'

export const Layout = () => {
    const menuOpen = useSelector(state => state.menu.isOpen)
    const favOpen = useSelector(state => state.favStore.isOpen)
    const cartOpen = useSelector(state => state.cartStore.isOpen)
    const mobileFiltersOpen = useSelector(state => state.filters.isOpen)

    return (
        <div className={menuOpen || favOpen || cartOpen || mobileFiltersOpen ? `${s.app}` : undefined}>
            <Navbar />
            <div className={s.outlet}>
                <Outlet />
            </div>
            <Footer />
            {
                menuOpen && <BurgerMenu />
            }
            {
                favOpen &&
                <Favourites />
            }
            {
                cartOpen &&
                <Cart />
            }
        </div>
    )
}
