import React from "react";
import Hero from '../Components/Hero/Hero'
import Popular from "../Components/Popular/Popular";
import Offers from "../Components/Offers/Offers"
import NewCollections from "../Components/NewCollections/NewCollections";
import NewsLetter from "../Components/NewsLetter/NewsLetter";
import AOS from 'aos'
import { useEffect } from "react";
// import 'aos/dist/aos.css'

// import Footer from "../Components/Footer/Footer";
const Shop=()=>{

    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);


    return (

        <div>
            {/*  */}
            <Hero />
            <Popular/>
            <Offers/>
            <NewCollections/>
            <NewsLetter/>
            {/* <Footer/> */}
        </div>
    )
}

export default Shop