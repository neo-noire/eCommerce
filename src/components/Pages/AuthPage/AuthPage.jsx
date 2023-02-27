import React, { useState } from 'react'
import s from './AuthPage.module.css'
import HomeIcon from '@mui/icons-material/Home';
import { NavLink as Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addUserToken } from '../../../store/userSlice/userSlice';
import axios from 'axios';

export const AuthPage = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const handleSubmit = () => {
        const user = {
            username: userName,
            email,
            password
        }
        axios
            .post('http://localhost:1337/api/auth/local/register', user)
            .then(response => {
                // Handle success.
                console.log('Well done!');
                dispatch(addUserToken(response.data.jwt))
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
                    Register your account
                </h1>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className={s.item}>
                        <label htmlFor="email" >Your User Name</label>
                        <input type="text" value={userName} onChange={e => setUserName(e.currentTarget.value)}
                            placeholder="user" required={true} />
                    </div>
                    <div className={s.item}>
                        <label htmlFor="email" >Your email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.currentTarget.value)}
                            placeholder="name@company.com" required={true} />
                    </div>
                    <div className={s.item}>
                        <label htmlFor="password" >Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.currentTarget.value)}
                            placeholder="Enter your password"
                            required={true} />
                    </div>

                    <button type="submit" onClick={handleSubmit}>Register</button>
                    <p>
                        Already have an account?
                        <Link to='/login'>Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
