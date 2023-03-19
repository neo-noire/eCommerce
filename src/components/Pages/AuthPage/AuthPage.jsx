import React, { useState } from 'react'
import s from './AuthPage.module.css'
import HomeIcon from '@mui/icons-material/Home';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { NavLink as Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addImgId, registerUser } from '../../../store/userSlice/userSlice';
import axios from 'axios';

export const AuthPage = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [passVisible, setPassVisible] = useState(false)
    const [error, setError] = useState(false)
    const dispatch = useDispatch()

    const handleVisibility = () => {
        if (passVisible) {
            return 'text'
        } else {
            return 'password'
        }
    }

    const handleSubmit = async () => {
        const user = {
            username: userName,
            email,
            password
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/local/register`, user)
            dispatch(registerUser(response.data))

            const formdata = new FormData();
            formdata.append("data", `{"userId" : "${response.data.user.id}"}`);
            const img = await axios.post(`${process.env.REACT_APP_API_URL}/user-imgs`, formdata, {
                headers: {
                    Authorization: `Bearer ${response.data.jwt}`
                }
            })

            const imgId = new FormData();
            imgId.append("imgId", `${img.data.data.id}`);

            await axios.put(`${process.env.REACT_APP_API_URL}/user/me`, imgId, {
                headers: {
                    Authorization: `Bearer ${response.data.jwt}`
                }
            })
            console.log('form is been submitted');
            navigate('/')
        } catch (error) {
            setError(error.response)
            console.log('An error occurred:', error);
        } finally {

        }
    }

    console.log(error);
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
                        Register your account
                    </h1>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className={s.item}>
                            <label htmlFor="email" >Your User Name</label>
                            <input
                                className={userName.length >= 6 ? `${s.valid}` : undefined}
                                type="text"
                                value={userName}
                                onChange={e => setUserName(e.currentTarget.value)}
                                placeholder="User Name" required={true} />
                        </div>
                        <div className={s.item}>
                            <label htmlFor="email" >Your email</label>
                            <input
                                className={email.length >= 6 ? `${s.valid}` : undefined}
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.currentTarget.value)}
                                placeholder="name@company.com" required={true} />
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
                            onClick={handleSubmit}>Register</button>
                        <p>
                            Already have an account?
                            <Link to='/login'>Sign In</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}
