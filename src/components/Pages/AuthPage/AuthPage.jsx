import React, { useState } from 'react'
import s from './AuthPage.module.css'
import HomeIcon from '@mui/icons-material/Home';
import { NavLink as Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addImgId, registerUser } from '../../../store/userSlice/userSlice';
import axios from 'axios';

export const AuthPage = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const handleSubmit = async () => {
        const user = {
            username: userName,
            email,
            password
        }

        try {
            const response = await axios.post('http://localhost:1337/api/auth/local/register', user)
            dispatch(registerUser(response.data))

            const formdata = new FormData();
            formdata.append("data", `{"userId" : "${response.data.user.id}"}`);
            const img = await axios.post('http://localhost:1337/api/user-imgs', formdata, {
                headers: {
                    Authorization: `Bearer ${response.data.jwt}`
                }
            })

            const imgId = new FormData();
            imgId.append("imgId", `${img.data.data.id}`);
            
            await axios.put('http://localhost:1337/api/user/me', imgId, {
                headers: {
                    Authorization: `Bearer ${response.data.jwt}`
                }
            })
            console.log('form is been submitted');
        } catch (error) {
            console.log('An error occurred:', error);
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
