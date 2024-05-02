import React from "react";
import './NewsLetter.css'
import 'aos/dist/aos.css'
const NewsLetter=()=>{

    return(

        <div className="newsletter" data-aos="fade-up">

            <h1>Get Exclusive Offers On Your Email</h1>
            <p>Subscribe to our newsletter and stay updated</p>
            <div>
                <input type="email" placeholder="Your Email id" id="emailID"/>
                <button>Subscribe</button>
            </div>
        </div>
        
    )
}

export default NewsLetter