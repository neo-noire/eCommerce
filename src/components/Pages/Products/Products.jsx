import React, { useState } from 'react'
import { useParams } from 'react-router'
import useFetch from '../../../hooks/useFetch'
import { RangeInput } from '../../RangeInput/RangeInput'
import { ProdList } from './ProdList/ProdList'
import s from './Products.module.css'


export const Products = () => {
    const catId = useParams().id

    const [sortBy, setSortBy] = useState(null);
    const [sliderPrice, setSliderPrice] = useState([0, 100])

    const { data: img, loading: imgLoading} = useFetch(`/categories?[filters][id][$eq]=${catId}&populate=*`)

    //list for sub-category sorting
    const { data: subCat } = useFetch(`/sub-categories?[filters][categories][id][$eq]=${catId}`)
    const [subCategories, setSubCategories] = useState([])
    const handleChange = (e) => {
        const value = e.currentTarget.value;
        const isChecked = e.currentTarget.checked;

        setSubCategories(isChecked
            ? [...subCategories, value]
            : subCategories.filter(el => el !== value))
    }


    return (
        <div className={s.container}>
            <div className={s.filters}>
                <div className={s.catFilter}>
                    <h3 className={s.title}>Product Category</h3>
                    <ul>
                        {subCat && subCat.map((el) => <li key={el.id}>
                            <label className={s.chbx}><input value={el.id} type='checkbox' onChange={handleChange} />{el.attributes.title}</label>
                        </li>)}
                    </ul>
                </div>
                <div className={s.catFilter}>
                    <h3 className={s.title}>Filter by Price</h3>
                    <RangeInput value={sliderPrice} setValue={setSliderPrice} />
                </div>
                <div className={s.catFilter}>
                    <h3 className={s.title}>Sort by:</h3>
                    <ul>
                        <li><label><input
                            type='radio'
                            name='sort'
                            value={'lth'}
                            onChange={(e) => setSortBy(e.target.value)}
                        />Price from low to high</label></li>
                        <li><label><input
                            type='radio'
                            name='sort'
                            value={'htl'}
                            onChange={(e) => setSortBy(e.target.value)}
                        />Price from high to low</label></li>
                        <li><label><input
                            type='radio'
                            name='sort'
                            value={'ssn'}
                            onChange={(e) => setSortBy(e.target.value)}
                        />New Season</label></li>
                    </ul>
                </div>

            </div>
            <div className={s.products}>

                <img className={s.catImg}
                    src={imgLoading
                        ? 'Loading...'
                        : img && process.env.REACT_APP_UPLOAD_URL + img[0]?.attributes?.img?.data?.attributes?.url}
                    alt={img && img[0]?.attributes?.title} />
                <ProdList
                    catId={catId}
                    subCat={subCategories}
                    sortFilter={sortBy}
                    priceRange={sliderPrice}
                />
            </div>
        </div>
    )
}
