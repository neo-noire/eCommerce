import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar/Navbar'
import { Footer } from './Footer/Footer'

export const Layout = () => {
    
    return (
        <div className='app'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}
