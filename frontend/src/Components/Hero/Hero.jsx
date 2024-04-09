import React from "react";
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.png'

const Hero=()=>{

    return(

        <div className="hero">

            <div className="hero-left">
                <h2>NEW ARRIVALS ONLY</h2>
                <div>
                <div className="hero-hand-icon">
                    <p>new</p>
                    <img src={hand_icon} alt="hand icon" />
                </div>
                <p>Collections</p>
                <p>For everyone</p>
                </div>
            
            <div className="hero-latest-btn">
                <div>Latest Collections</div>
                <img src={arrow_icon} alt="arrow" />
            </div>
            </div>
            <div className="hero-right">

                <img src={hero_image} alt="heroimg" />
            </div>

        </div>
    )
}

export default Hero