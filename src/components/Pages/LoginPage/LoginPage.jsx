import React, { useState } from 'react'
import s from './LoginPage.module.css'
import HomeIcon from '@mui/icons-material/Home';
import { NavLink as Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {  addUserToken } from '../../../store/userSlice/userSlice';
import axios from 'axios';

export const LoginPage = () => {
    const navigate = useNavigate()

    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const handleSubmit = () => {
        const user = {
            identifier,
            password
        }
        axios
            .post('http://localhost:1337/api/auth/local', user)
            .then(response => {
                // Handle success.
                console.log('Well done!');
                dispatch(addUserToken(response.data))
            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
            });

        console.log('form is been submitted');
        navigate('/')
    }


    return (
        <div className={s.main}>
            <div className={s.form}>
                <Link to='/'>
                    <HomeIcon className={s.home} />
                </Link>
                <h1>
                    Login
                </h1>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className={s.item}>
                        <label htmlFor="email" >Your User Name or Email</label>
                        <input type="text" value={identifier} onChange={e => setIdentifier(e.currentTarget.value)}
                            placeholder="user" required={true} />
                    </div>
                    <div className={s.item}>
                        <label htmlFor="password" >Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.currentTarget.value)}
                            placeholder="Enter your password"
                            required={true} />
                    </div>

                    <button type="submit" onClick={handleSubmit}>Login</button>
                    <p>
                        Do not have an account?
                        <Link to='/auth'>Register</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
