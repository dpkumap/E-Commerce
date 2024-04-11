import React, { createContext } from "react";
import all_product from "../Components/Assets/all_product"

export const ShopContext=createContext(null);//created shop context

const ShopContextProvider=(props)=>{

    const contextValue={all_product};

    return(

       <ShopContext.Provider value={contextValue}>
        {props.children}
        </ShopContext.Provider>
    )
}
// using this we can provide shop context data to all pages
export default ShopContextProvider