import React, { useEffect, useState } from 'react'
import s from './ProdList.module.css'
import { Card } from '../../../Card/Card'
import useFetch from '../../../../hooks/useFetch'


export const ProdList = ({ catId, subCat, sortFilter, priceRange }) => {
    const [sorted, setSorted] = useState([]);

    // use 'pagination[start]=0&pagination[limit]=5' for infinity scroll logic
    const { data, loading } = useFetch(`/products?&populate=*&results=10&[filters][categories][id][$eq]=${catId}${subCat?.map(
        el => `&[filters][sub_categories][id][$eq]=${el}`)}&_limit=5&_start=0`)

    useEffect(() => {
        const sortBy = (result) => {
            if (!sortFilter) return
            console.log('reached sort fn');
            switch (sortFilter) {
                case 'lth':
                    setSorted(result.sort((a, b) => a.attributes.price - b.attributes.price))
                    break;
                case 'htl':
                    setSorted(result.sort((a, b) => b.attributes.price - a.attributes.price))
                    break;
                case 'ssn':
                    setSorted(result.filter(el => el.attributes.isNew))
                    break;

                default:
                    break;
            }
        }

        const result = data?.filter(el => el.attributes.price >= priceRange[0] && el.attributes.price <= priceRange[1]);
        if (!sortFilter) return setSorted(result)
        sortBy(result)
    }, [sortFilter, priceRange, data])

    return (
        <div className={s.cardList}>
            {loading
                ? 'Loading...'
                : data && sorted?.map(el => <Card key={el.id} id={el.id} data={el.attributes} />)}
        </div>
    )
}
