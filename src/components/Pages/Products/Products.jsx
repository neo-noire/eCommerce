import React, { useState } from 'react'
import { useParams } from 'react-router'
import useFetch from '../../../hooks/useFetch'
import { ProdList } from './ProdList/ProdList'
import s from './Products.module.css'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { Filters } from './Filters/Filters'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { useDispatch, useSelector } from 'react-redux'
import { closeFilters, openFilters } from '../../../store/filtersSlice/filtersSlice'


export const Products = () => {
    const catId = useParams().id
    const dispatch = useDispatch()
    const desctopOff = useMediaQuery("(min-width: 1032px)")

    const [sortBy, setSortBy] = useState(null);
    const [sliderPrice, setSliderPrice] = useState([0, 100])
    const [maxPrice, setMaxPrice] = useState(null)

    const { data: img, loading: imgLoading } = useFetch(`/categories?[filters][id][$eq]=${catId}&populate=*`)
    //list for sub-category sorting
    const [subCategories, setSubCategories] = useState([])

    const openFiltersHandler = () => {
        dispatch(openFilters())
    }

    return (
        <div className={s.container}>
            <div className={s.productsBanner}>
                {imgLoading
                    ? "Loading"
                    : img && <img className={s.catImg}
                        src={img[0]?.attributes?.img?.data?.attributes?.url}
                        alt={img[0]?.attributes?.title} />
                }
            </div>
            {
                !desctopOff &&
                <div className={s.mobileFilter}>
                    <button type='button' onClick={openFiltersHandler}>
                        <FilterAltOutlinedIcon />
                        Filters
                    </button>
                </div>
            }
            <Filters
                isMobile={!desctopOff}
                subCategories={subCategories}
                setSubCategories={setSubCategories}
                catId={catId}
                maxPrice={maxPrice}
                sliderPrice={sliderPrice}
                setSliderPrice={setSliderPrice}
                setSortBy={setSortBy} />
            <div className={s.products}>
                <ProdList
                    catId={catId}
                    subCat={subCategories}
                    sortFilter={sortBy}
                    priceRange={sliderPrice}
                    setMaxPrice={setMaxPrice}
                />
            </div>
        </div>
    )
}
