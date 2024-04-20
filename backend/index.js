const port=4000;
const express = require('express');
const app=express();//creating app instance
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path=require('path');
const cors=require('cors');
const { type } = require('os');
const { error } = require('console');


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

//creating users Schema

const Users=mongoose.model('Users',{

    name:{
        type:String,

    },
    email:{
        type:String,
        unique:true,
    },
    password:{

        type:String,
    },
    cartData:{

        type:Object,

    },
    date:{

        type:Date,
        default:Date.now,
    }
})

//creating APi(or endpoint) for registering user
app.post('/signup',async (req,res)=>{

    let check=await Users.findOne({email:req.body.email})
    //in above if email id already there then we get that

    if(check){

        return res.status(400).json({success:false,errors:"existing user found with same email"})
        
    }
    let cart={};

    for(let i=0;i<300;i++){

        cart[i]=0;

    }

    const user=new Users({

        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })
// above user created and 
    await user.save(); //this will save that user in database

    //creating token
    const data={

        user:{

            id:user.id
        }
    }
   //generating token we use sign()
    const token=jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})

//creating API for user login

app.post('/login',async (req,res)=>{

    let user=await Users.findOne({email:req.body.email});//using this we get email id perticular user

    if(user){

        const passCompare=req.body.password===user.password;

        if(passCompare){

            const data={

                user:{

                    id:user.id
                }
            }
            const token=jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }else{

            res.json({success:false,errors:"Wrong Password"});
        }
    }
    else{

        res.json({success:false,errors:"Wrong Email Id"})
    }
})

app.listen(port,(error)=>{

    if(!error){

        console.log('server runing on port '+port)
    }else{

        console.log("error : "+erro);
    }
})

