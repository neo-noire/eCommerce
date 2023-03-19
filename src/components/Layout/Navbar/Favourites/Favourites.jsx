import React from 'react'
import s from './Favourites.module.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import { closeFav, deleteFromFav, resetFavourite } from '../../../../store/favouriteSlice/favouriteSlice';
import { NavLink } from 'react-router-dom';

export const Favourites = ({ setOpenFav }) => {
    const dispatch = useDispatch()
    const favState = useSelector(state => state.favStore?.favourite)

    const removeFavHandler = (id) => {
        dispatch(deleteFromFav(id))
    }

    const closeHandler = () => {
        dispatch(closeFav())
    }

    return (
        <div className={s.wrapper}
            onClick={closeHandler}>
            <div className={s.cart}
                onClick={(e) => e.stopPropagation()}>
                <div className={s.top}>
                    <h2 className={s.title}>Your Wish List:</h2>
                    <button
                        onClick={closeHandler}
                        className={s.leave}>X</button>
                </div>
                <div className={s.content}>
                    {
                        favState.length !== 0 ? favState.map((el, pos) => <div key={el.id}
                            className={s.item}>
                            <NavLink onClick={closeHandler} to={`/product/${el.id}`} className={s.left}>
                                <img src={el.img} alt={el.title} />
                            </NavLink>
                            <div className={s.center}>
                                <NavLink onClick={closeHandler} to={`/product/${el.id}`}>
                                    <h3>{el.title}</h3>
                                </NavLink>
                                <span> Price is: ${el.price}</span>
                            </div>
                            <button
                                onClick={() => removeFavHandler(el.id)}
                                className={s.right}>
                                <DeleteForeverIcon />
                            </button>
                        </div>) : <div className={s.empty}>
                            Your wish list is empty
                        </div>
                    }
                </div>
                <div className={s.bottom}>
                    <button
                        onClick={() => dispatch(resetFavourite())}
                        className={s.reset}>
                        Reset Wish List
                    </button>
                </div>
            </div>
        </div>
    )
}
