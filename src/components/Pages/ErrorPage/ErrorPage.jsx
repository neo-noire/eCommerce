import React from 'react'
import { useNavigate } from 'react-router-dom'
import s from './ErrorPage.module.css'

export const ErrorPage = () => {
    const navigate = useNavigate()
    return (
        <div className={s.error}>
            <div className={s.content}>
                <h1>Uupsss looks like some Error Occured...</h1>

                <span>Let's try to start from the begining...</span>
                <button onClick={() => navigate('/')}>Try</button>
            </div>
        </div>
    )
}
