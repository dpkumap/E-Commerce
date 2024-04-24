import React, { useContext } from "react";
import './CSS/ShopCategory.css'
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import { useLocation } from 'react-router-dom';

const ShopCategory= (props) =>{
    // using context accessing data
    const {all_product}=useContext(ShopContext);
    const location = useLocation(); 
    useEffect(() => {
        // Reinitialize AOS whenever the location changes
        AOS.init({
            duration: 1500,
            // Add other AOS options if needed
        });
    }, [location]);


    return (

        <div className="shop-category" >

            <img className="shop-category-banner" src={props.banner} alt="category banner" data-aos="fade-down" />
            <div className="shopCategory-indexSort">
                <p>
                    <span>Showing 1-12</span> out of 36 products
                </p>
                <div className="shopCategory-sort">
                Sort by <img src={dropdown_icon} alt="dropdown Icons" />
                </div>
            </div>
            {/* mapping the diff category products  */}

            <div className="shopcategory-products" data-aos="fade-up">
                {all_product.map((item,index)=>{
                    if(props.category===item.category){

                        return  <div className="item-container3" key={index}>
                        <Item id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
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