import React, { useState } from 'react'
import s from './LoginPage.module.css'
import HomeIcon from '@mui/icons-material/Home';
import { NavLink as Link, useNavigate } from 'react-router-dom'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch } from 'react-redux'
import { registerUser, addImgId } from '../../../store/userSlice/userSlice';
import axios from 'axios';

export const LoginPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')
    const [passVisible, setPassVisible] = useState(false)
    const [error, setError] = useState(false)


    const handleVisibility = () => {
        if (passVisible) {
            return 'text'
        } else {
            return 'password'
        }
    }
    const handleSubmit = async () => {
        const user = {
            identifier,
            password
        }
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/local`, user)
            dispatch(registerUser(res.data))


            console.log('form is been submitted');
            navigate('/')
        } catch (error) {
            setError(error.response)
            console.log(error);
        }
    }


    return (
        <div className={s.main}>
            <div className={s.form}>
                <Link to='/'>
                    <HomeIcon className={s.home} />
                </Link>
                <div className={s.left}>
                    <img src='https://res.cloudinary.com/dj8y8vspg/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1678135511/00_story_4fbdb90b75.webp' />
                </div>
                <div className={s.right}>
                    <h1>
                        Sign In
                    </h1>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className={s.item}>
                            <label htmlFor="email" >Your User Name or Email</label>
                            <input
                                className={identifier.length >= 6 ? `${s.valid}` : undefined}
                                type="text"
                                value={identifier}
                                onChange={e => setIdentifier(e.currentTarget.value)}
                                placeholder="User Name or Email" required={true} />
                        </div>
                        <div className={s.item}>
                            <label htmlFor="password" >Password</label>
                            <input
                                className={password.length >= 6 ? `${s.valid}` : undefined}
                                type={handleVisibility()}
                                value={password}
                                onChange={e => setPassword(e.currentTarget.value)}

                                placeholder="Enter your password"
                                required={true} />
                            {
                                passVisible
                                    ? <VisibilityOffIcon onClick={() => setPassVisible(false)} className={s.visibility} />
                                    : <VisibilityIcon onClick={() => setPassVisible(true)} className={s.visibility} />
                            }
                        </div>
                        {
                            error &&
                            <div className={s.error}>
                                <span>{error.data.error.message}</span>
                            </div>
                        }

                        <button
                            className={s.submitBtn}
                            type="submit"
                            onClick={handleSubmit}>Login</button>
                        <p>
                            Don't have an account?
                            <Link to='/auth'>Sign Up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}
