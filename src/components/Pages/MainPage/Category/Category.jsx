import React from 'react'
import s from './Category.module.css'
import { Link } from 'react-router-dom'
import { routerIds } from '../../../../router/routerIds'

export const Category = () => {
    return (
        <div className={s.category}>
            <div className={s.item1}>
                <img className={s.gridImg} src='https://img.huffingtonpost.com/asset/5ce6bd0c210000b90ed0ed6a.jpeg?ops=scalefit_720_noupscale' alt='sads' />
                <Link to='/products/5' className={s.categoryName}>Sale</Link>
            </div>
            <div className={s.item2}>
                <img className={s.gridImg} src='https://cdn.shopify.com/s/files/1/0248/3473/6191/files/womens_tops_2_1800x.jpg?v=1630508297' alt='sads' />
                <Link to='/products/3' className={s.categoryName}>New Season</Link>
            </div>
            <div className={s.item3}>
                <img className={s.gridImg} src='https://assets.vogue.com/photos/61e9c42f201fe8db0bc39899/master/pass/00_promo.jpg' alt='sads' />
                <Link to={`/products/${routerIds.men}`} className={s.categoryName}>Men</Link>
            </div>
            <div className={s.item4}>
                <img className={s.gridImg} src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/classic-accessories-1516305397.jpg?crop=0.6666666666666666xw:1xh;center,top&resize=1200:*' alt='sads' />
                <Link to={`/products/${routerIds.accessories}`} className={s.categoryName}>Accessories</Link>
            </div>
            <div className={s.item5}>
                <img className={s.gridImg} src='https://www.telegraph.co.uk/content/dam/fashion/2022/10/25/TELEMMGLPICT000313960470_trans_NvBQzQNjv4Bq7Cadr0IoOOfMS5GpRLWfGbVvz_IXZinEqtDTKahtjvc.jpeg' alt='sads' />
                <Link to={`/products/${routerIds.women}`} className={s.categoryName}>Women</Link>
            </div>
            <div className={s.item6}>
                <img className={s.gridImg} src='https://image.made-in-china.com/202f0j00dsIYeqzRgEoD/New-Autumn-Style-Pointed-Toe-Single-Lady-Shoes-Flat-Shallow-Mouth-Korean-Version-Soft-Sole-Comfort-Shoes-Fashion-Women-Shoes-Flat-Shoe.jpg' alt='sads' />
                <Link to='/products/3' className={s.categoryName}>Shoes</Link>
            </div>
        </div>
    )
}
