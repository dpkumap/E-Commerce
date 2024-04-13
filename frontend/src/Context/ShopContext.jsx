import React, { createContext, useState } from "react";
import all_product from "../Components/Assets/all_product"

export const ShopContext=createContext(null);//created shop context

//creating cart 
const getDefaultCart=()=>{

    let cart ={};
    for(let index=0;index<all_product.length+1;index++){
        cart[index]=0;

    }
    return cart;

}
const ShopContextProvider=(props)=>{
//creating usestate variable

    const[cartItems,setCartItems]=useState(getDefaultCart());
    
    

    //creating add to cart func
    
    const addToCart=(itemId)=>{

        setCartItems((prev) => {
            const updatedCart = { ...prev, [itemId]: prev[itemId] + 1 };
            console.log(updatedCart); // Log the updated cart
            return updatedCart;
        });
    }

    const removeFromCart=(itemId)=>{

        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount=()=>{

        let totalAmount=0;
        for(const item in cartItems){

            if(cartItems[item]>0){

                let itemInfo=all_product.find((product)=>product.id===Number(item));
                totalAmount+=itemInfo.new_price* cartItems[item];
            }
            
        }
        return totalAmount;
    }
    const getTotalCartItems =()=>{

        let totalItem=0;
        for(const item in cartItems){

            if(cartItems[item]>0){

                totalItem+=cartItems[item];

            }
        }
        return totalItem;

    }

    const contextValue={getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};
    return(

       <ShopContext.Provider value={contextValue}>
        {props.children}
        </ShopContext.Provider>
    )
}
// using this we can provide shop context data to all pages
export default ShopContextProvider