import React from 'react'
import { Category } from './Category/Category'
import { Slider } from './Slider/Slider'
import { FeaturedProducts } from './FeaturedProducts/FeaturedProducts'
import { ContactUs } from './Contact/ContactUs'


export const MainPage = () => {
    return (
        <div>
            <Slider />
            <FeaturedProducts type='featured' />
            <Category />
            <FeaturedProducts type='trending' />
            <ContactUs />
        </div>
    )
}   
