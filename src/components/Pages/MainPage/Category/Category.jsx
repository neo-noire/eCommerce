import React, { useEffect, useRef } from 'react'
import s from './Category.module.css'
import { Link } from 'react-router-dom'
import { routerIds } from '../../../../router/routerIds'

export const Category = () => {

    return (
        <div className={s.category}>
            <div className={s.item1}>
                <img className={s.gridImg} src='https://bluejay.com.my/wp-content/uploads/2021/12/Kids-clothes-Hong-Kong-seed.jpg' alt='sads' />
                <Link to={`/products/${routerIds.children}`} className={s.categoryName}>Children</Link>
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
        </div>
    )
}
