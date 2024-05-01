import React, { createContext, useEffect, useState } from "react";
// import all_product from "../Components/Assets/all_product"

export const ShopContext=createContext(null);//created shop context

//creating cart 
const getDefaultCart=()=>{

    let cart ={};
    for(let index=0;index<300+1;index++){
        cart[index]=0;

    }
    return cart;

}
const ShopContextProvider=(props)=>{
//creating usestate variable

    const [all_product,setAll_Product]=useState([]);
    const[cartItems,setCartItems]=useState(getDefaultCart());
    
    useEffect(()=>{

        fetch('https://crownmode-be.onrender.com/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_Product(data))

        if(localStorage.getItem('auth-token')){

            fetch('https://crownmode-be.onrender.com/getcart',{

                method:"POST",
                headers:{

                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':"application/json",
                },
                body:"",
            }).then((response)=>response.json())
            .then((data)=>setCartItems(data));
        }
    },[])
    

    //creating add to cart func
    
    const addToCart=(itemId)=>{

        setCartItems((prev) => {
            const updatedCart = { ...prev, [itemId]: prev[itemId] + 1 };
            // console.log(updatedCart); // Log the updated cart
            if(localStorage.getItem('auth-token')){
                
                fetch('https://crownmode-be.onrender.com/addtocart',{

                    method:"POST",
                    headers:{
                        Accept:"application/form-data",
                        'auth-token':`${localStorage.getItem('auth-token')}`,
                        'Content-Type':"application/json"

                    },
                    body:JSON.stringify({"itemId":itemId}),
                })
                .then((response)=>response.json())
                .then((data)=>console.log(data))
            }
            return updatedCart;
            
        });
    }

    const removeFromCart=(itemId)=>{

        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))

        if(localStorage.getItem('auth-token')){

            fetch('https://crownmode-be.onrender.com/removefromcart',{

            method:"POST",
            headers:{
                Accept:"application/form-data",
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':"application/json"

            },
            body:JSON.stringify({"itemId":itemId}),
        })
        .then((response)=>response.json())
        .then((data)=>console.log(data))

        }
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