import React, { useState, useEffect } from "react";
import { Link } from '@remix-run/react'; 

export const Navbar = (props) => {
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const localFormData = localStorage.getItem('formData');
        
        if (localFormData) {
            setFormData(JSON.parse(localFormData));
        }
    }, []);


    return (
        <div className="navbar">
            { JSON.stringify(formData) }
            { formData === null ? "has not logged in": "has logged in" }

            {/* TRAINER */}
            <Link to="/home">Home</Link> 
            <Link to="/timetable">Timetable</Link> 
            <Link to="/account.trainer">Account</Link> 
            <Link to="/clients">Clients</Link> 
            <Link to="/profile.trainer">Profile</Link>
            <Link to="/login">Login</Link> 
            <Link to="/signup">Signup</Link> 
            
            {/* CLIENT */}
            <Link to="/profile.client/">Profile</Link> 
            <Link to="/home">Home</Link> 
            <Link to="/timetable">Timetable</Link> 
            <Link to="/progress/client">Progress</Link>
            <Link to="/login">Login</Link> 
            <Link to="/signup">Signup</Link> 
            {/* NOT LOGGED IN */}
            <Link to="/home">Home</Link> 
            <Link to="/login">Login</Link> 
            <Link to="/signup">Signup</Link> 


            <button onClick={()=>{console.log("Hello World!")}}>THIS IS A BUTTON</button>
        </div>
    )
}

export default Navbar;