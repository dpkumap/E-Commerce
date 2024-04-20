const port=4000;
const express = require('express');
const app=express();//creating app instance
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path=require('path');
const cors=require('cors');
const { type } = require('os');


app.use(express.json());
app.use(cors());//connect ot express app using 4000 port

//database connection with mongo db
mongoose.connect("mongodb+srv://deepakumap4141:333725@cluster0.6klj2cb.mongodb.net/ecommerce");

//api creation

app.get("/",(req,res)=>{

    res.send("express app is runnig ");

})

//image storage engine

const storage = multer.diskStorage({

    destination:"./upload/images",
    filename:(req,file,cb)=>{

        return cb(null,`${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`)
    }
})

//creating multer function


const upload =multer({storage:storage})

//creating end point to upload imgs

app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{

    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

//create endpoint to add product in DB

//we need  create schema for creating product

const Product = mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{

        type:String,
        required:true,


    },
    image:{

        type:String,
        required:true,
    },
    category:{

        type:String,
        required:true,
    },
    new_price:{

        type:Number,
        required:true,
    },
    old_price:{

        type:Number,
        required:true,
    },
    date:{

        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },

})

//add product endpoint

app.post('/addproduct',async (req,res)=>{
    let products= await Product.find({})
    let id;
    if(products.length>0){

        let last_product_array=products.slice(-1);
        let last_product=last_product_array[0];
        id=last_product.id+1;
    }else{

        id=1;
    }

    const product=new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,

    });
    console.log(product)
    await product.save();
    console.log("saved pro");
    res.json({

        success:true,
        name:req.body.name,
    })
})

//creating APi for deleting products 

app.post('/removeproduct',async (req,res)=>{

    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed Pro");
    res.json({

        success:true,
        name:req.body.name,

    })
})

//creating APi for getting all products
app.get('/allproducts',async (req,res)=>{

    let products = await Product.find({});

    console.log("all products fetched");

    res.send(products);
})

app.listen(port,(error)=>{

    if(!error){

        console.log('server runing on port '+port)
    }else{

        console.log("error : "+erro);
    }
})

