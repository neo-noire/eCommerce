import React from 'react'
import { Link } from 'react-router-dom'
import s from './Footer.module.css'

export const Footer = () => {
    return (
        <footer className={s.container}>
            <div className={s.top}>
                <section className={s.categories}>
                    <h3>Categories</h3>
                    <ul>
                        <li><Link>Women</Link></li>
                        <li><Link>Men</Link></li>
                        <li><Link>Shoes</Link></li>
                        <li><Link>Accessories</Link></li>
                        <li><Link>New Arrivals</Link></li>
                    </ul>
                </section>
                <section className={s.links}>
                    <h3>Links</h3>
                    <ul>
                        <li><Link>FAQ</Link></li>
                        <li><Link>Pages</Link></li>
                        <li><Link>Stores</Link></li>
                        <li><Link>Compare</Link></li>
                        <li><Link>Cookies</Link></li>
                    </ul>
                </section>
                <section className={s.about}>
                    <h3>About</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat dolores asperiores consequuntur ullam! Veniam dicta corporis cupiditate reprehenderit maiores. Animi officia exercitationem tenetur aliquam qui.</p>
                </section>
                <section className={s.contacts}>
                    <h3>Contact</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat dolores asperiores consequuntur ullam! Veniam dicta corporis cupiditate reprehenderit maiores. Animi officia exercitationem tenetur aliquam qui.</p>

                </section>
            </div>
            <div className={s.bottom}>
                <div className='left'>
                    <span>MykolaSTORE</span>
                    <span> &#169; copyright 2023. All rights reserved</span>
                </div>
                <div className='right'>bla bla bla</div>
            </div>
        </footer>
    )
}
