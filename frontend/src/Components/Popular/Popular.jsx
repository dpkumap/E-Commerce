import React, { useEffect, useState } from "react";
import './Popular.css'
// import data_product from '../Assets/data'
import Item from "../Item/Item";
// import AOS from 'aos'
// import 'aos/dist/aos.css'
const Popular=()=>{

    const[popularProduct,setPopularProduct]=useState([]);

    useEffect(()=>{

        fetch('http://localhost:4000/popularinmen')
        .then((response)=>response.json())
        .then((data)=>setPopularProduct(data));

        
    },[])

    return (

        <div className="popular" >
            <h1>POPULAR IN MENS</h1>
            <hr />
            <div className="popular-item">

                {popularProduct.map((item,i)=>{

return (
    <div className="item-container" key={i}>
        <Item id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
    </div>
);
                })}
            </div>
        </div>
    )
}

export default Popular