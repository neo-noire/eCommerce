import React, { useState } from 'react'
import s from "./ContactUs.module.css";

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
            </div>
        </div>
    )
}
