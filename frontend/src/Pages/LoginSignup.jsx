import React from "react";
import './CSS/LoginSignup.css'
import { useState } from "react";

const LoginSignup = () =>{

    const [state,setState]=useState("Login");

    //creating state var to save input field data 
    const [formData,setFormData]=useState({

        username:"",
        password:"",
        email:""
    })

    const changeHandler=(e)=>{

        setFormData({...formData,[e.target.name]:e.target.value})
    }
    
    const login=async ()=>{

        console.log("login called",formData);
        try {
            let responseData;
            await fetch('http://localhost:4000/login', {
                method: "POST",
                headers: {
                    Accept: "application/form-data",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
            .then(Response => Response.json())
            .then((data) => {
                responseData = data;
            });
    
            if (responseData && responseData.success) {
                localStorage.setItem("auth-token", responseData.token);
                window.location.replace("/");
            } else {
                // Handle unsuccessful signup
                // console.error("Signup failed:", responseData);
                alert(responseData.errors);
            }
        } catch (error) {
            console.error("Error during Login:", error);
        }
    }
    const signup = async () => {
        try {
            let responseData;
            await fetch('http://localhost:4000/signup', {
                method: "POST",
                headers: {
                    Accept: "application/form-data",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
            .then(Response => Response.json())
            .then((data) => {
                responseData = data;
            });
    
            if (responseData && responseData.success) {
                localStorage.setItem("auth-token", responseData.token);
                window.location.replace("/");
            } else {
                // Handle unsuccessful signup
                // console.error("Signup failed:", responseData);
                alert(responseData.errors);
            }
        } catch (error) {
            console.error("Error during signup:", error);
        }
    };
    


    return (

        <div className="loginsignup">

            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                  {state==="Sign Up"?<input type="text"placeholder="Your Name" name="username" value={formData.username} onChange={changeHandler}/>:<></>}
                    <input name="email" value={formData.email} onChange={changeHandler} type="email"placeholder="Email Address" />
                    <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Password" />
                
                </div>
                <button onClick={()=>{state==="Login"?login():signup()}} >Continue</button>
                {state==="Sign Up"?
                 <p className="loginsignup-login">Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span> </p>:
                 <p className="loginsignup-login">Create an account? <span onClick={()=>{setState("Sign Up")}}>Click here</span> </p>}
                
                <div className="loginsignup-agree">
                    <input type="checkbox" name="" id="" />
                    <p>By Continuing, I agree to the terms of use and privacy policy.</p>
                </div>
            </div>

        </div>
    )
}

export default LoginSignup