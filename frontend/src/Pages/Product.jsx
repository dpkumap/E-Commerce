import React, { useContext } from "react";
import { useParams } from 'react-router-dom';
import Breadcrums from "../Components/Breadcrums/Breadcrums";
import { ShopContext } from "../Context/ShopContext";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox"
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";

const Product = () => {
    const { all_product } = useContext(ShopContext);
    const { productId } = useParams();
    
    // console.log(all_product);
    // Make sure to check if productId is defined before filtering
    const product = productId ? all_product.find((e) => e.id === Number(productId)) : null;

    // Ensure that product is defined before rendering Breadcrumbs
    if (!product) {
        return <div>Loading...</div>; // Or handle the case where product is not found
    }

    return (
        <div>
            <Breadcrums product={product} />
            <ProductDisplay product={product}/>
            <DescriptionBox/>
            <RelatedProducts/>
            {/* Render other product details here */}
        </div>
    );
}

export default Product;
