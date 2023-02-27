import React from 'react'
import s from './Favourites.module.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromFav, resetFavourite } from '../../../../store/favouriteSlice/favouriteSlice';

export const Favourites = ({setOpenFav}) => {
    const dispatch = useDispatch()
    const favState = useSelector(state => state.favStore?.favourite)

    const removeFavHandler = (id) => {
        dispatch(deleteFromFav(id))
    }

    return (
        <div className={s.cart} onMouseLeave={() => setOpenFav(false)}>
            <h2 className={s.title}>Your Wish List:</h2>
            {
                favState.length !== 0 ? favState.map((el, pos) => <div key={el.id}
                    className={s.item}>
                    <div className={s.left}><img src={el.img} alt={el.title} /></div>
                    <div className={s.center}>
                        <h3>{el.title}</h3>
                        <span> Price is: ${el.price}</span>
                    </div>
                    <button
                        onClick={() => removeFavHandler(el.id)}
                        className={s.right}>
                        <DeleteForeverIcon />
                    </button>
                </div>) : <div>
                    Your wish list is empty
                </div>
            }
            <button className={s.btn}>Proceed to checkout</button>
            <button
                onClick={() => dispatch(resetFavourite())}
                className={s.reset}>Reset Wish List</button>
        </div>
    )
}
