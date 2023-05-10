import React from 'react'
import { Card } from '../../../Card/Card'
import s from './FeaturedProducts.module.css'
import useFetch from '../../../../hooks/useFetch'


export const FeaturedProducts = ({ type }) => {

    const { data, loading, error } = useFetch(`/products?populate=*&[filters][type][$eq]=${type}&pagination[limit]=4`)
    return (
        <div className={s.featuredProducts}>
            {/* {type && <div className={s.top}>
                <h2 className={s.sectionTitle}>{`${type} Products`}</h2>
                <p className={s.sectionText}>
                    Introducing our top picks for this season!
                    Discover the latest trends and must-have styles in our featured section.
                    From casual and comfy to chic and elegant, we have curated a collection that suits every taste and occasion.
                    Browse through our exclusive range of high-quality clothing, footwear, and accessories, all handpicked by our expert stylists.
                </p>
            </div>} */}
            <div className={s.products}>
                {
                    error
                        ? 'Some error looks like!'
                        : loading
                            ? 'Loading in progress'
                            : data?.map(el => <Card style={{ minWidth: '250px', borderRadius: '.5rem', overflow: 'hidden' }} key={el.id} id={el.id} data={el.attributes} />)
                }
            </div>
        </div>
    )
}
