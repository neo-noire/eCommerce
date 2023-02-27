import React, { useState } from 'react'
import s from "./ContactUs.module.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import PinterestIcon from '@mui/icons-material/Pinterest';

export const ContactUs = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        if (email === '') return
        console.log('this is submut action');
        setEmail('')
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit()
        }
    }
    return (
        <div className={s.background}>
            <div className={s.container}>
                <span className={s.left}>Be in touch with us: </span>
                <label className={s.center}>
                    <input
                        onKeyDown={handleKeyDown}
                        value={email}
                        onChange={e => setEmail(e.currentTarget.value)}
                        placeholder='Enter your e-mail' type='email' />
                    <button onClick={handleSubmit}>JOIN US</button>
                </label>
                <div className={s.right}>
                    <a href='https://www.facebook.com/zuck/'
                        target="_blank" rel="noreferrer">
                        <FacebookIcon />
                    </a>
                    <a href='https://www.instagram.com/mileycyrus/'
                        rel="noreferrer" target="_blank">
                        <InstagramIcon />
                    </a>
                    <a href='https://twitter.com/elonmusk'
                        rel="noreferrer" target="_blank">
                        <TwitterIcon />
                    </a>
                    <a href='https://letmegooglethat.com/?q=keep+it+dance'
                        rel="noreferrer" target="_blank">
                        <GoogleIcon />
                    </a>
                    <a href='https://pinterest.com/#top'
                        rel="noreferrer" target="_blank">
                        <PinterestIcon />
                    </a>
                </div>
            </div>
        </div>
    )
}
