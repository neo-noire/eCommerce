import React from 'react'
import s from './Cart.module.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import { resetCart, deleteItem } from '../../../../store/cartSlice/cartSlice';
import { loadStripe } from '@stripe/stripe-js';
import { makeRequest } from '../../../../features/makeRequest';
import axios from 'axios';

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
    
    const stripePromise = loadStripe('pk_test_51MhD15B0niWLCqAgQGZDnkmH9SbRiwnrLNzgfNijjyanaSCzlfzcjKet2cgV0lbzXoLsjwLxR7AjuYIWBFf8QAPR00ItOrFJHV');
    //payment by strapi service
    const handlePayment = async () => {
        
        try {
            const stripe = await stripePromise;
            
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/orders`, cartState)
         
            await stripe.redirectToCheckout({
                sessionId: res.data.stripeSession.id
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div onMouseLeave={() => setOpenCart(false)} className={s.cart}>
            <h2 className={s.title}>Products in cart :</h2>
            {
                cartState.length !== 0 ? cartState.map((el, pos) => <div key={el.id}
                    className={s.item}>
                    <div className={s.left}><img src={el.img} alt={el.title} /></div>
                    <div className={s.center}>
                        <h3>{el.title}</h3>
                        <span>{el.quantity} x {el.price}</span>
                    </div>
                    <button
                        onClick={() => deleteHandler(el.id)}
                        className={s.right}>
                        <DeleteForeverIcon />
                    </button>
                </div>) : <div>
                    Cart is empty
                </div>
            }
            <div className={s.subtotal}>
                <h2>SUBTOTaL</h2>
                <span>$ {totalPrice()}</span>
            </div>
            <button onClick={handlePayment} className={s.btn}>Proceed to checkout</button>
            <button
                onClick={resetHandler}
                className={s.reset}>Reset Cart</button>
        </div>
    )
}
