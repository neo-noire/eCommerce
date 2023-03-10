import React, { useRef, useState } from 'react'
import { useParams } from 'react-router'
import s from './Product.module.css'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import useFetch from '../../../hooks/useFetch'
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../../store/cartSlice/cartSlice'
import { addToFav } from '../../../store/favouriteSlice/favouriteSlice';


export const Product = () => {
    const prodId = useParams().id


    const { data, loading } = useFetch(`/products/${prodId}?populate=*`)
    const [img, setImg] = useState("img")

    //order counter for cart
    const [value, setValue] = useState(1)
    const inpRef = useRef()
    const handleFocus = () => {
        inpRef.current.blur()
        console.log('work');
    }

    //add to cart
    const dispatch = useDispatch()
    const cartHandler = () => {
        const order = {
            id: data.id,
            quantity: parseInt(inpRef.current.value),
            title: data.attributes.title,
            desc: data.attributes.description,
            price: data.attributes.price,
            img: process.env.REACT_APP_UPLOAD_URL + data?.attributes?.img?.data?.attributes?.url,
        }
        debugger
        dispatch(add(order))
    }
    //Favourites
    const favList = useSelector(state => state.favStore.favourite)
    //add to favorites
    const addToFavourites = () => {
        const favItem = {
            id: data.id,
            title: data.attributes.title,
            desc: data.attributes.description,
            price: data.attributes.price,
            img: process.env.REACT_APP_UPLOAD_URL + data?.attributes?.img?.data?.attributes?.url,

        }

        dispatch(addToFav(favItem))
    }



    return (
        <div className={s.container}>
            {loading ? " Loading... " :
                <><div className={s.left}>
                    <div className={s.imgSmall}>
                        <img
                            onClick={() => setImg("img")}
                            src={process.env.REACT_APP_UPLOAD_URL + data?.attributes?.img?.data?.attributes?.url}
                            alt='one' />
                        <img
                            onClick={() => setImg("img2")}
                            src={process.env.REACT_APP_UPLOAD_URL + data?.attributes?.img2?.data?.attributes?.url}
                            alt='one' />
                        <img
                            onClick={() => setImg("img3")}
                            src={process.env.REACT_APP_UPLOAD_URL + data?.attributes?.img3?.data?.attributes?.url}
                            alt='one' />
                    </div>
                    <div className={s.imgBig}>
                        <img src={process.env.REACT_APP_UPLOAD_URL + data?.attributes[img].data?.attributes?.url} alt='' />
                    </div>
                </div>
                    <div className={s.right}>
                        <h2 className={s.productTitle}>
                            {data?.attributes?.title}
                        </h2>
                        <div className={s.price}>
                            $ {data?.attributes?.price}
                        </div>
                        <p className={s.productText}>
                            {data?.attributes?.description}
                        </p>
                        <div className={s.buyCounter}>
                            <button onClick={() => {
                                handleFocus();
                                setValue(prev => prev === 1 ? 1 : prev - 1)
                            }}>-</button>
                            <input
                                ref={inpRef}
                                type='number'
                                value={value}
                                min={0}
                                onChange={(e) => e.currentTarget.value === '' ? setValue(1) : setValue(e.currentTarget.value)} />
                            <button onClick={() => {
                                handleFocus()
                                setValue(prev => prev + 1)
                            }}>+</button>
                        </div>
                        <button className={s.cartBtn} onClick={cartHandler}>
                            <AddShoppingCartIcon />
                            <span>
                                Add to cart
                            </span>
                        </button>
                        <div className={s.sublists}>
                            {loading
                                ? 'Loading...'
                                : favList?.find(el => el.id === data?.id)
                                    ? <span >
                                        <FavoriteIcon />
                                        Go to wish list
                                    </span>
                                    : <span onClick={addToFavourites}>
                                        <FavoriteBorderIcon />
                                        add to wish list
                                    </span>
                            }
                        
                        </div>
                        <div className={s.info}>
                            <span>Vendor: Polo</span>
                            <span>Product Type: Shirt</span>
                            <span>Tag: Shirt, Men, Top</span>
                        </div>
                        <hr />
                        <div className={s.details}>
                            <span>description</span>
                            <hr />
                            <span>Additional information</span>
                            <hr />
                            <span>FAQ</span>
                        </div>
                    </div></>}
        </div>
    )
}
