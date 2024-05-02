import React, { useState } from "react";
import './RelatedProducts.css'
// import data_product from '../Assets/data'
import Item from '../Item/Item'
const RelatedProducts=()=>{

    const [relatedProduct,setRelatedProduct]=useState([]);

    useEffect(()=>{

        fetch('https://crownmode-be.onrender.com/popularinmen')
        .then((response)=>response.json())
        .then((data)=>setRelatedProduct(data));

        
    },[])
    
    
    return (

        <div className="relatedproducts">
            <h1>Related Products</h1>
            <hr />
            <div className="relatedproducts-item">
                    {relatedProduct.map((item,i)=>{
                        return(
                            <div className="item-container3" key={i}>
                        <Item id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
                    </div>
                        ) 
                    })}
            </div>
        </div>
    )
}

export default RelatedProducts
