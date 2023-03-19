import React from 'react'
import s from './Cart.module.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import { resetCart, deleteItem, closeCart } from '../../../../store/cartSlice/cartSlice';
import { loadStripe } from '@stripe/stripe-js';
import { makeRequest } from '../../../../features/makeRequest';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export const Cart = ({ setOpenCart }) => {
    const dispatch = useDispatch()
    const cartState = useSelector(state => state.cartStore?.cart)
    const jwt = useSelector(state => state?.userStore?.user?.jwt)

    //count total price
    const totalPrice = () => {
        let total = cartState?.reduce((acc, curr) => acc += (curr.price * curr.quantity), 0)
        return total.toFixed(2)
    }

    //reset cart
    const resetHandler = () => {
        dispatch(resetCart())
    }

    //delete item from cart
    const deleteHandler = (id) => {
        dispatch(deleteItem(id))
    }

    const closeHandler = () => {
        dispatch(closeCart())
    }

    const stripePromise = loadStripe('pk_test_51MhD15B0niWLCqAgQGZDnkmH9SbRiwnrLNzgfNijjyanaSCzlfzcjKet2cgV0lbzXoLsjwLxR7AjuYIWBFf8QAPR00ItOrFJHV');
    //payment by strapi service
    const handlePayment = async () => {

        try {
            const stripe = await stripePromise;

            const res = await axios.post(`${process.env.REACT_APP_API_URL}/orders`, cartState)
            await stripe.redirectToCheckout({
                sessionId: res.data.stripeSession.id
            })
            closeHandler()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div
            onClick={closeHandler}
            className={s.wrapper}>
            <div onClick={e => e.stopPropagation()} className={s.cart}>
                <div className={s.top}>
                    <h2 className={s.title}>Your Cart:</h2>
                    <button
                        onClick={closeHandler}
                        className={s.leave}>X</button>
                </div>
                <div className={s.content}>
                    {
                        cartState.length !== 0 ? cartState.map((el, pos) => <div key={el.id}
                            className={s.item}>
                            <NavLink
                                to={`/product/${el.id}`}
                                onClick={closeHandler}
                                className={s.left}>
                                <img src={el.img} alt={el.title} />
                            </NavLink>
                            <div className={s.center}>
                                <NavLink
                                    onClick={closeHandler}
                                    to={`/product/${el.id}`}>
                                    <h3>{el.title}</h3>
                                </NavLink>
                                <span>{el.quantity} x {el.price}</span>
                            </div>
                            <button
                                onClick={() => deleteHandler(el.id)}
                                className={s.right}>
                                <DeleteForeverIcon />
                            </button>
                        </div>) : <div className={s.empty}>
                            Cart is empty
                        </div>
                    }
                </div>
                <div className={s.bottom}>
                    <div className={s.subtotal}>
                        <h2>SUBTOTaL</h2>
                        <span>$ {totalPrice()}</span>
                    </div>
                    <button onClick={handlePayment} className={s.btn}>Proceed to checkout</button>
                    <button
                        onClick={resetHandler}
                        className={s.reset}>Reset Cart</button>
                </div>
            </div>
        </div>
    )
}
