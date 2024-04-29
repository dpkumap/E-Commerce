import React from "react";
import './BreadCrum.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'
const Breadcrums = (props)=>{

    const {product}=props;
    return (

        <div className="breadcrum">
            HOME <img src={arrow_icon} alt="arrow" />SHOP <img src={arrow_icon} alt="arrow" />{product.category} <img src={arrow_icon} alt="arrows" />{product.name} 
        </div>

    )
}

export default Breadcrums