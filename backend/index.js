
const express = require('express');
const app=express();//creating app instance
const mongoose = require('mongoose');//using this we can use mongoDB
const jwt = require('jsonwebtoken');//using this we can generate token nd verify it
const multer = require('multer');//we can create img storage sys for uupload endpoint
const path=require('path');//
const cors=require('cors');//provide access to react project
const { type } = require('os');
const { error, log } = require('console');

// app.use(express.static(path.join(__dirname, '..','frontend', 'build')));

// // Your other routes and middleware...

// // Route for serving index.html
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..',  'frontend', 'build', 'index.html'));
// });

const port=process.env.PORT || 4000;
app.use(express.json());//req parse using json method 
app.use(cors());//connect ot express app using 4000 port



//database connection with mongo db
mongoose.connect("mongodb+srv://deepakumap4141:333725@cluster0.6klj2cb.mongodb.net/ecommerce");

//api creation to check express app

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

//add product endpoint API to store product in DB

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
    // console.log(product)
    await product.save();
    // console.log("saved pro");
    res.json({

        success:true,
        name:req.body.name,
    })
})

//creating APi for deleting products by taking product id 

app.post('/removeproduct',async (req,res)=>{

    await Product.findOneAndDelete({id:req.body.id});
    // console.log("Removed Pro");
    res.json({

        success:true,
        name:req.body.name,

    })
})

//creating APi for getting all products to fetch all pro from DB
app.get('/allproducts',async (req,res)=>{

    let products = await Product.find({});

    // console.log("all products fetched");

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

//creating APi(or endpoint) for registering user to create user account
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

//creating endpoint for new collection data
app.get('/newcollections',async(req,res)=>{

    let products=await Product.find({});
    let newcollection=products.slice(1).slice(-8);
    // console.log("new Collection fetch");
    res.send(newcollection);

})

//creating  endpoint for popular in men section
app.get('/popularinmen',async(req,res)=>{

    let products=await Product.find({category:"men"})//it will search for men category from all pro
    let popular_in_women=products.slice(0,4);
    // console.log("popular in men fetch");
    res.send(popular_in_women);
})


//creating middleware to fetch user to convert auth-token in user id
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).send({ errors: "Please Authenticate using valid token" });
    }

    try {
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ errors: 'Please authenticate using valid token' });
    }
}

//creating endpoint for adding products in cart

app.post('/addtocart',fetchUser,async (req,res)=>{

    // console.log("added",req.body.itemId);
    // console.log(req.body,req.user);
    let userData=await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.json({ message: 'Item added to cart' });

})

//creating endpoint to remove product from cart data 

app.post('/removefromcart',fetchUser,async (req,res)=>{

    console.log("removed",req.body.itemId);
    let userData=await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.json({ message: 'Item removed from cart' });
})

//creating endpoint to get cart data

app.post('/getcart',fetchUser,async(req,res)=>{

    console.log("get cart");

    let userData=await Users.findOne({_id:req.user.id})
    res.json(userData.cartData);
})


//to listen express app to run backend server
app.listen(port,(error)=>{

    if(!error){

        // console.log('server runing on port '+port)
    }else{

        // console.log("error : "+error);
    }
})

