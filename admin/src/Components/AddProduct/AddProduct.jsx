import React from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
import { useState } from 'react'

const AddProduct=()=>{

    //state variables 
    const [productDetails,setProductDetails]=useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:""
    })
    const [image,setImage]=useState(false);


    const changeHandler =(e)=>{

        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }

    // const Add_Product = async ()=>{

    //     // console.log(productDetails);
    //     let responseData;
    //     let product=productDetails;

    //     let formData=new FormData();
    //     formData.append('product',image);

    //     //sending formdata to API

    //     await fetch('http://localhost:4000/upload',{
    //         method:'POST',
    //         headers:{
    //             Accept:'application/json',
    //         },
    //         body:formData,


    //     }).then((resp)=>resp.json()).then((data)=>{responseData=data})

    //     if(responseData.succes){

    //         product.image=responseData.image_url;
    //         console.log(product)
    //     }else{

    //         console.log("nothing")
    //     }
    // }
    const Add_Product = async () => {
        try {
            let formData = new FormData();
            formData.append('product', image);
    
            const response = await fetch('https://crownmode-be.onrender.com/upload', {
                method: 'POST',
                body: formData,
            });
    
            if (!response) {
                throw new Error('Failed to upload image');
            }
    
            const responseData = await response.json();
    
            if (responseData) {
                const updatedProductDetails = { ...productDetails, image: responseData.secure_url };
                setProductDetails(updatedProductDetails);
                // console.log(updatedProductDetails);
                await fetch('https://crownmode-be.onrender.com/addproduct',{
                    method:"POST",
                    headers:{
                        Accept:"application/json",
                       "Content-Type":"application/json",
                    },
                    body:JSON.stringify(updatedProductDetails),
                }).then((resp)=>resp.json()).then((data)=>{
                     data.success?alert("Product Added"):alert("Failed")
                })
            } 
        } catch (error) {
            console.error('Error occurred during image upload:', error);
        }
    };
    
    //creating function to connect 

    const imageHandler=(e)=>{

        setImage(e.target.files[0]);

        
    }

    return (

        <div className="add-product">
            <div className="addproduct-itemfield">
                <p>Product Tittle</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder='Type here' />
            </div>
            <div className="addproduct-price">
            <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder='Type here' />

                </div>
           
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='Type here' />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
               <label htmlFor="file-input">
                    <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img' alt="uploadicon" />
                </label> 
                <input onChange={imageHandler} type="file" name="image" id="file-input" hidden/>
            </div>
            <button onClick={()=>{Add_Product()}} className='addproduct-btn'>ADD</button>
        </div>
    )
}

export default AddProduct
