import React, { useContext } from "react";
import './CSS/ShopCategory.css'
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'

const ShopCategory= (props) =>{
    // using context accessing data
    const {all_product}=useContext(ShopContext);

    return (

        <div className="shop-category">

            <img className="shop-category-banner" src={props.banner} alt="category banner" />
            <div className="shopCategory-indexSort">
                <p>
                    <span>Showing 1-12</span> out of 36 products
                </p>
                <div className="shopCategory-sort">
                Sort by <img src={dropdown_icon} alt="dropdown Icons" />
                </div>
            </div>
            {/* mapping the diff category products  */}

            <div className="shopcategory-products">
                {all_product.map((item,index)=>{
                    if(props.category===item.category){

                        return  <div className="item-container3" key={index}>
                        <Item name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
                    </div>
                        
                    }else{

                        return null;
                    }
                })}
            </div>
            <div className="shopcategory-loadmore">
                Explore More
            </div>
        </div>
    )

}

export default ShopCategory