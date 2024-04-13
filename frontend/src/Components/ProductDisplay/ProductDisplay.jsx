import React, { useContext } from "react";
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay =(props)=>{

    const {product}=props;
    const {addToCart}=useContext(ShopContext);
    return(

        <div className="productdisplay">

            <div className="productdisplay-left">

                <div className="productdisplay-img-list">
                    <img src={product.image} alt="look1" />
                    <img src={product.image} alt="look2" />
                    <img src={product.image} alt="look3" />
                    <img src={product.image} alt="look4" />
                </div>
                <div className="productdisplay-img">
                    <img className="productdisplay-main-img" src={product.image} alt="productimgs" />
                </div>
            </div>

            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="rating1" />
                    <img src={star_icon} alt="rating2" />
                    <img src={star_icon} alt="rating3" />
                    <img src={star_icon} alt="rating4" />
                    <img src={star_dull_icon} alt="rating5" />
                    <p>(222)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${product.old_price}</div>
                    <div className="productdisplay-right-price-new">${product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                Stay cozy in style with our green hoody, crafted with comfort and durability for everyday wear.
                </div>
                <div className="productdisplay-right-size">
                    <h1>select Size</h1>
                    <div className="productdisplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
                <p className="productdisplay-right-category"><span>Category : </span>Women, T-Shirt, Crop Top</p>
                <p className="productdisplay-right-category"><span>Tags : </span>Modern, Latest</p>
            </div>
        </div>
    )

}

export default ProductDisplay