import React, { useRef, useState } from 'react'
import Slider from 'react-slick'
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import s from './Slider.module.css'
import { NavLink } from 'react-router-dom'


export const SliderComponent = () => {
    const ref = useRef()
    var settings = {
        dots: false,
        infinite: true,
        speed: 800,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const goNext = () => {
        ref.current.slickNext()
    }
    const goPrev = () => {
        ref.current.slickPrev()
    }


    const data = [
        {
            id: 1,
            category: 'men',
            url: "https://t3.ftcdn.net/jpg/03/53/08/92/360_F_353089200_fkHk6iJtrsZRldSqBlUOfRVOomSZSUYy.jpg",
        },
        {
            id: 2,
            category: 'men',
            url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZmFzaGlvbnxlbnwwfHwwfHw%3D&w=1000&q=80",
        },
        {
            id: 3,
            category: 'men',
            url: "https://www.jdinstitute.edu.in/media/2021/07/Types-of-Fashion-Photography-Thumbnail.jpg",
        },
        {
            id: 4,
            category: 'men',
            url: "https://cdn.pixabay.com/photo/2017/05/13/12/40/fashion-2309519__340.jpg"
        }
    ]
    return (
        <section className={s.wrapper}>
            <div className={s.slider}>
                <Slider ref={ref} {...settings}>
                    {

                        data.map((el, idx) =>
                            <div key={el.id} className={s.container}>
                                <NavLink to={`products/${el.id}`}>
                                    <img className={s.img} key={idx} src={el.url} alt='' />
                                </NavLink>
                            </div>
                        )
                    }
                </Slider>
                {/* <div className={s.arrows}>
                    <div className={s.icon} onClick={goPrev}><WestIcon /></div>
                    <div className={s.icon} onClick={goNext}><EastIcon /></div>
                </div> */}
            </div>
        </section>
    )
}
