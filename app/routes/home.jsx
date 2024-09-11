import { Link } from "@remix-run/react";
import * as React from 'react';
import Navbar from "../components/Navbar";
import "../styles/home.css"; // Import the new CSS file

const Home = () => {
    console.log("Home component rendered");
    return (
        <div>
            <Navbar />
            <div className="container">
                <h1>Welcome to the Home Page</h1>
                <p>This is the main content area of your home page.</p>
            </div>
        </div>
    );
};

export default Home;
