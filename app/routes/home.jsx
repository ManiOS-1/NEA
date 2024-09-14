// import { Link } from "@remix-run/react";
// import * as React from 'react';
// import Navbar from "../components/Navbar";
// import "../styles/home.css"; // Import the new CSS file

// const Home = () => {
//     console.log("Home component rendered");
//     return (
//         <div>
//             <Navbar />
//             <div className="container">
//                 <h1>Welcome to the Home Page</h1>
//                 <p>This is the main content area of your home page.</p>
//             </div>
//         </div>
//     );
// };

// export default Home;

import { Link } from "@remix-run/react";
import * as React from 'react';
import Navbar from "../components/Navbar";
import "../styles/home.css"; // Import the new CSS file

const Home = () => {
    const sections = [
        {
            text: "Welcome to my website! This is a website for personal trainers managing their clients. The trainers can manage their clients and make edits to their timetables, adding classes and sessions. Both clients and trainers have profiles where you can talk about who you are and your specialties as a trainer and your goals as a client. Hopefully, the trainers specialties is compatable with their client goals.",
            imageUrl: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        },
        {
            text: "If you haven't made an account already, make sure to sign up for free. This website is useful for both personal trainers their clients. Clients can view their timetables and also see progress on all different types of exercieses. While trainers can manage their clients and enter the values the client can see. The client can not change this information and only a trainer can. After you have made your account you can view your profile and even add a bio and as a trainer you can add specialties and as a client you can add your goals. Hopefully, you",
            imageUrl: "https://images.pexels.com/photos/260352/pexels-photo-260352.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        },
        {
            text: "This is some text for the third section.",
            imageUrl: "https://st2.depositphotos.com/1017228/7108/i/450/depositphotos_71080145-stock-photo-gym-interior-with-equipment.jpg",
        },
    ];

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1>Welcome!</h1>
                
                {sections.map((section, index) => (
                    <div key={index} className={`content-section ${index % 2 === 0 ? 'image-left' : 'image-right'}`}>
                        <div className="image-container">
                            <img src={section.imageUrl} alt={`Section ${index + 1}`} />
                        </div>
                        <div className="text-container">
                            <p>{section.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
