import { Link } from "@remix-run/react";
import * as React from 'react';
import Navbar from "../components/Navbar"; // Adjust the path if necessary

const home = () => {
    console.log("Home component rendered");
    return (
        <div>
            <Navbar />
            <div style={{ padding: "20px" }}>
                <h1>Welcome to the Home Page</h1>
                <p>This is the main content area of your home page.</p>
            </div>
        </div>
    );
};

export default home;
