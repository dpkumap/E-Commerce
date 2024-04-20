 import React from 'react'
 import './Navbar.css'
import navlogo from '../../assets/nav-logo.svg'
import navProfile from '../../assets/nav-profile.svg'
 const Navbar=()=>{

    return(

        <div className="navbar">
            <img src={navlogo} className='nav-logo' alt="navcompanylogo" />
            <img src={navProfile} alt="profilepic" className='nav-profile' />
        </div>
    )
 }
 export default Navbar