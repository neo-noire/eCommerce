import React from 'react'
import s from './Card.module.css'
import { Link } from 'react-router-dom'

export const Card = (props, styles) => {

    return (
        <Link className={s.link} styles={styles} to={`/product/${props.id}`}>
            <div key={props.id} className={s.card}>
                <div className={s.imgCard}>
                    {props.data?.isNew && <div
                        className={s.isNew}>
                        New Season
                    </div>}
                    <img className={s.img}
                        src={props.data?.img?.data?.attributes?.url}
                        alt={props.data?.title} />
                    <img className={`${s.img} ${s.img2}`} src={props.data?.img2?.data?.attributes?.url} alt={props.data?.title} />
                </div>
                <h2 className={s.cardTitle}>{props.data?.title}</h2>
                <div className={s.prices}>
                    <span className={s.oldPrice}>${props.data?.oldPrice || props.data?.price + 20}</span>
                    <span className={s.price}>${props.data?.price}</span>
                </div>
            </div>
        </Link>
    )
}
