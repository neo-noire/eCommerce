import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useFetch from '../../../../hooks/useFetch'
import { closeFilters } from '../../../../store/filtersSlice/filtersSlice'
import { RangeInput } from '../../../RangeInput/RangeInput'

import s from './Filters.module.css'

export const Filters = ({ isMobile, catId, maxPrice, sliderPrice, setSliderPrice, setSortBy, subCategories, setSubCategories }) => {
    const dispatch = useDispatch()
    const mobileFiltersOpen = useSelector(state => state.filters.isOpen)
    const { data: subCat } = useFetch(`/sub-categories?[filters][categories][id][$eq]=${catId}`)

    const handleChange = (e) => {
        const value = e.currentTarget.value;
        const isChecked = e.currentTarget.checked;

        setSubCategories(isChecked
            ? [...subCategories, value]
            : subCategories.filter(el => el !== value))
    }

    const closeFiltersHandler = () => {
        dispatch(closeFilters())
    }

    if (isMobile) {
        if (!mobileFiltersOpen) return
        return (
            <div
                onClick={closeFiltersHandler}
                className={s.wrapper}>
                <div
                    onClick={e => e.stopPropagation()}
                    className={s.mobile}>
                    <div className={s.filters}>
                        <div className={s.catFilter}>
                            <h3 className={s.title}>Product Category</h3>
                            <ul>
                                {subCat && subCat.map((el) =>
                                    <li key={el.id}>
                                        <label className={s.chbx}><input value={el.id} type='checkbox' onChange={handleChange} />{el.attributes.title}</label>
                                    </li>)}
                            </ul>
                        </div>
                        <div className={s.catFilter}>
                            <h3 className={s.title}>Filter by Price</h3>
                            <RangeInput value={sliderPrice} setValue={setSliderPrice} maxPrice={maxPrice} />
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
                </div>
            </div>
        )
    }

    return (
        <div className={s.filters}>
            <div className={s.catFilter}>
                <h3 className={s.title}>Product Category</h3>
                <ul>
                    {subCat && subCat.map((el) =>
                        <li key={el.id}>
                            <label className={s.chbx}><input value={el.id} type='checkbox' onChange={handleChange} />{el.attributes.title}</label>
                        </li>)}
                </ul>
            </div>
            <div className={s.catFilter}>
                <h3 className={s.title}>Filter by Price</h3>
                <RangeInput value={sliderPrice} setValue={setSliderPrice} maxPrice={maxPrice} />
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
    )
}
