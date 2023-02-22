import React, { useState } from 'react'
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import s from './Slider.module.css'

export const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0)


    const data = [
        "https://t3.ftcdn.net/jpg/03/53/08/92/360_F_353089200_fkHk6iJtrsZRldSqBlUOfRVOomSZSUYy.jpg",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZmFzaGlvbnxlbnwwfHwwfHw%3D&w=1000&q=80",
        "https://www.jdinstitute.edu.in/media/2021/07/Types-of-Fashion-Photography-Thumbnail.jpg",
        "https://cdn.pixabay.com/photo/2017/05/13/12/40/fashion-2309519__340.jpg"
    ]

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? data.length - 1 : prev => prev - 1)
    }
    const nextSlide = () => {
        setCurrentSlide(currentSlide === data.length - 1 ? 0 : prev => prev + 1)
    }
    return (
        <div className={s.slider}>
            <div className={s.container}
                style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
            >
                {data.map(el => <img src={el} alt='name' />)}
            </div>
            <div className={s.icons}>
                <div className={s.icon} onClick={prevSlide}>
                    <WestIcon />
                </div>
                <div className={s.icon} onClick={nextSlide}>
                    <EastIcon />
                </div>
            </div>
        </div>
    )
}
