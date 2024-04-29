import React from "react";
import './Offers.css'
import 'aos/dist/aos.css'
import exclusive_img from '../Assets/exclusive_image2.jpg'
const Offers=()=>{


    return (

        <div className="offers" data-aos="fade-up">
            <div className="offers-left">
                <h1>Exclusive</h1>
                <h1>Offers For You</h1>
                <p>ONLY ON BEST SELLERS PRODUCTS</p>
                <button>Check Now</button>
            </div>
            <div className="offers-right">
                <img src={exclusive_img} alt="exclusiveImage" />

            </div>
        </div>

    )
}

export default Offers