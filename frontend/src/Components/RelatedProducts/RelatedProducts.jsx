// import React from "react";
// import './RelatedProducts.css'
// import data_product from '../Assets/data'
// import Item from '../Item/Item'
// const RelatedProducts=()=>{


    
//     return (

//         <div className="relatedproducts">
//             <h1>Related Products</h1>
//             <hr />
//             <div className="relatedproducts-item">
//                     {data_product.map((item,i)=>{
//                         return(
//                             <div className="item-container3" key={i}>
//                         <Item id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
//                     </div>
//                         ) 
//                     })}
//             </div>
//         </div>
//     )
// }

// export default RelatedProducts
import React, { useState, useEffect } from 'react';
import ProductDisplay from '../ProductDisplay/ProductDisplay';

const RelatedProducts = ({ category }) => {
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const response = await fetch(`/relatedproducts/${category}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch related products');
                }
                const data = await response.json();
                setRelatedProducts(data);
            } catch (error) {
                console.error('Error fetching related products:', error);
            }
        };

        fetchRelatedProducts();
    }, [category]);

    return (
        <div className="related-products">
            <h2>Related Products</h2>
            <div className="product-list">
                {relatedProducts.map(product => (
                    <ProductDisplay key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
