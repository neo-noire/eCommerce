import React from 'react'
import { Card } from '../../../Card/Card'
import s from './FeaturedProducts.module.css'
import useFetch from '../../../../hooks/useFetch'


export const FeaturedProducts = ({ type }) => {

    const { data, loading, error } = useFetch(`/products?populate=*&[filters][type][$eq]=${type}&pagination[limit]=4`)

    return (
        <div className={s.featuredProducts}>
            {type && <div className={s.top}>
                <h2 className={s.sectionTitle}>{`${type} Products`}</h2>
                <p className={s.sectionText}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem vero illum voluptas labore nam explicabo possimus ullam laborum aperiam sit nostrum blanditiis et, ipsa debitis illo qui culpa deserunt itaque?
                    Iste quod beatae tenetur quam quidem eligendi minus dolorem doloremque omnis. Dicta harum totam fugiat animi exercitationem, provident eveniet sequi impedit cumque eos non a possimus odio sunt cupiditate et?
                    Repudiandae, veritatis vitae quas aliquam similique fugit eum et sunt accusamus delectus vero? Officiis magni iure ratione laboriosam alias beatae itaque exercitationem. Et vero non dolore est maxime nesciunt consequatur!
                    Iusto quis ducimus, tempora maxime nemo dolorum necessitatibus quo quasi voluptas nostrum perspiciatis neque quas fugit, atque labore esse aut odit et hic dolorem. Doloremque iusto beatae inventore facere. Omnis.
                    Fugiat velit ad voluptas cum eius natus? Doloremque nam voluptatem eos quod harum cupiditate, consequatur, laboriosam quasi placeat beatae nemo illo vitae delectus adipisci facilis sint quia facere ex corporis.</p>
            </div>}
            <div className={s.products}>
                {
                    error
                        ? 'Some error looks like!'
                        : loading
                            ? 'Loading in progress'
                            : data?.map(el => <Card styles={{ minWidth: '215px' }} key={el.id} id={el.id} data={el.attributes} />)
                }
            </div>
        </div>
    )
}
