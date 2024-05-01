import React, { useEffect, useState } from "react";
import './NewCollections.css';
// import new_collection from '../Assets/new_collections';
import Item from '../Item/Item';
import 'aos/dist/aos.css'

const NewCollections = () => {

    const [new_collection,setNew_collection]=useState([]);

    useEffect(()=>{

        fetch('https://crownmode-be.onrender.com/newcollections')
        .then((response)=>response.json())
        .then((data)=>setNew_collection(data));
        

    },[])

    return (
        <div className="new-collections" id="latestCollections" data-aos="fade-up">
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className="collections">
                {new_collection.map((item, i) => (
                    <div className="item-container2" key={i}>
                        <Item id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewCollections;
