import React, { useState } from 'react'
import s from './LoginPage.module.css'
import HomeIcon from '@mui/icons-material/Home';
import { NavLink as Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerUser, addImgId } from '../../../store/userSlice/userSlice';
import axios from 'axios';

export const LoginPage = () => {
    const navigate = useNavigate()

    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const handleSubmit = async () => {
        const user = {
            identifier,
            password
        }
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/local`, user)
            dispatch(registerUser(res.data))
            

            console.log('form is been submitted');
        } catch (error) {
            console.log(error);
        } finally {
            navigate('/')
        }
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
