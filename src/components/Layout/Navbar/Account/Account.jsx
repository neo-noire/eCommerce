import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import s from './Account.module.css'
import { removeUser } from '../../../../store/userSlice/userSlice';
import axios from 'axios'

export const Account = ({ setAcc, url, setUserPic }) => {
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.userStore?.user)
    const jwt = useSelector(state => state?.userStore?.user?.jwt)


    const [avatar, setAvatar] = useState(url ? url : undefined)
    const [file, setFile] = useState(null)

    const logoutHandler = () => {
        dispatch(removeUser())
        setAcc(false)
    }

    const uploadToUser = (e) => {
        const url = URL.createObjectURL(e.currentTarget.files[0])
        setFile(e.target.files[0])
        setAvatar(url)
    }

    const uploadToServer = async () => {
        const formdata = new FormData();
        formdata.append("data", `{"userId" : "${userInfo.user.id}"}`);
        formdata.append("files.avatar", file, "[PROXY]");

        const imgId = parseInt(userInfo.user.imgId)
        
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/user-imgs/${imgId}?populate=*`, formdata, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            setFile(null)
            setUserPic(avatar)
            
        } catch (error) {
            console.log(error);
        }
    }
    const timer = () => { setTimeout(() => { setAcc(false) }, 2000) }

    return (
        <div className={s.container} onMouseLeave={timer}>
            <div className={s.top}>
                <div className={s.left}>
                    <div className={s.wrapper}>
                        <div className={s.avatar}>
                            {
                                avatar && jwt
                                    ? <img
                                        src={avatar}
                                        alt={`${userInfo?.user?.username}'s avatar`} />
                                    : <AccountCircleIcon />
                            }
                        </div>
                        <label>
                            <CameraAltOutlinedIcon className={s.addAvatar} />
                            <input
                                onChange={(e) => uploadToUser(e)}
                                type='file'
                                name='avatar'
                                accept="image/png, image/gif, image/jpeg" />
                        </label>
                    </div>
                    {
                        file && <div className={s.upload} onClick={uploadToServer}>
                            <FileUploadOutlinedIcon className={s.upload} />
                            Upload
                        </div>
                    }
                </div>
                <div className={s.info}>
                    <h4>{userInfo?.user?.username}</h4>
                    <span>{userInfo?.user?.email}</span>
                    <button onClick={logoutHandler}>Log Out</button>
                </div>
            </div>
            <div className={s.center}></div>
            <div className={s.bottom}></div>
        </div>
    )
}
