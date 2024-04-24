import React from "react";
import './Footer.css'
import footer_logo from '../Assets/logo34.png'
import instagram_icon from '../Assets/instagram_icon.png'
import pinterest_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'
import 'aos/dist/aos.css'
import { Link } from "react-router-dom";

const Footer = ()=>{

    return(

        <div className="footer" data-aos="fade-up">
            <div className="footer-logo">
            <Link style={{textDecoration:'none'}} to='/'><img src={footer_logo} alt="shopLogo" /></Link>
                <p></p>
            </div>
            <ul className="footer-links">
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                <Link style={{textDecoration:'none'}} to='https://www.instagram.com/'> <img src={instagram_icon} alt="insta logo" /></Link>
                </div>
                <div className="footer-icons-container">
                <Link style={{textDecoration:'none'}} to='https://in.pinterest.com/'><img src={pinterest_icon} alt="pinterest Icon" /></Link>
                </div>
                <div className="footer-icons-container">
                <Link style={{textDecoration:'none'}} to='https://web.whatsapp.com/'> <img src={whatsapp_icon} alt="Whatsapp Icon" /></Link>
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>Copyright @ 2024 - All Rights Reserved!</p>
            </div>
        </div>

    )
}

export default Footer