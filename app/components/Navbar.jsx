// import React, { useState, useEffect } from "react";
// import { Link } from '@remix-run/react'; 
// import '../styles/navbar.css'; // Import the CSS file


// export const Navbar = (props) => {
//     const [formData, setFormData] = useState(null);

//     useEffect(() => {
//         const localFormData = localStorage.getItem('formData');
        
//         if (localFormData) {
//             setFormData(JSON.parse(localFormData));
//         }
//     }, []);


//     return (
//         <div className="navbar">
//             { JSON.stringify(formData) }
//             { formData === null ? "has not logged in": "has logged in" }

//             {/* TRAINER */}
//             <Link to="/home">Home</Link> 
//             <Link to="/timetable">Timetable</Link> 
//             <Link to="/account.trainer">Account</Link> 
//             <Link to="/clients">Clients</Link> 
//             <Link to="/profile.trainer">Profile</Link>
//             <Link to="/login">Login</Link> 
//             <Link to="/signup">Signup</Link> 
            
//             {/* CLIENT */}
//             <Link to="/profile.client/">Profile</Link> 
//             <Link to="/home">Home</Link> 
//             <Link to="/timetable">Timetable</Link> 
//             <Link to="/progress/client">Progress</Link>
//             <Link to="/login">Login</Link> 
//             <Link to="/signup">Signup</Link> 

//             {/* NOT LOGGED IN */}
//             <Link to="/home">Home</Link> 
//             <Link to="/login">Login</Link> 
//             <Link to="/signup">Signup</Link> 


//             <button onClick={()=>{console.log("Hello World!")}}>THIS IS A BUTTON</button>
//         </div>
//     )
// }

// export default Navbar;

// SOME DELETED JSX
// {userDetails.accountType === "Guest" ? (
//     <>
//         <Link to="/home">Home</Link>
//         <Link to="/login">Login</Link>
//         <Link to="/signup">Signup</Link>
//     </>
// ) : (
//     <>
//         {/* Additional links for authenticated users */}
//         <Link to="/home">Home</Link>
//         <Link to="/timetable">Timetable</Link>
//         <Link to="/profile">Profile</Link>
//     </>
// )}

import React, { useState, useEffect } from "react";
import { Link } from '@remix-run/react'; 
import '../styles/navbar.css'; // Import the CSS file

export const Navbar = (props) => {
    const [userDetails, setUserDetails] = useState({});

    // // Function to fetch the user's first name from the API
    // const fetchUserName = async (email) => {
    //     try {
    //         const response = await fetch(`/api/getUserName?email=${email}`);
    //         const data = await response.json();

    //         if (data && data.firstName) {
    //             setUserName(data.firstName);  // Set the user's first name
    //         } else {
    //             setUserName("Guest");  // Default if no user is found
    //         }
    //     } catch (error) {
    //         console.error("Error fetching user name:", error);
    //     }
    // };

    useEffect(() => {
        // Formdata: email, password, accountType
        const localFormData = localStorage.getItem('formData');
        console.log(localFormData)

        if (localFormData) {
            const parsedData = JSON.parse(localFormData);
            setUserDetails(parsedData)
        }

        // TEMPORARY COMMENTED OUT API CALL
        // if (localFormData) {
        //     const parsedData = JSON.parse(localFormData);
        //     const userEmail = parsedData?.email;  // Use email to determine user type

        //     // Fetch the user's first name based on their email
        //     if (userEmail) {
        //         fetchUserName(userEmail);
        //     }
        // }
    }, []);

    return (
        <div className="navbar">            
            {/* TRAINER */}
            { userDetails.accountType === "Trainer" ? (
                <>
                    {`Trainer Logged in with ${userDetails.email}`}
                    <Link to="/home">Home</Link> 
                    <Link to="/timetable">Timetable</Link> 
                    <a href={`/profile/trainer/${userDetails.email}`}>Profile</a> 
                    <Link to={`/clients/${userDetails.email}`}>Clients</Link> 
                </>) : <></>
            }

            {/* CLIENT */}
            { userDetails.accountType === "Client" ? (
                <>
                    {`Client Logged in with ${userDetails.email}`}
                    <Link to="/home">Home</Link> 
                    <Link to="/timetable">Timetable</Link> 
                    <a href={`/profile/client/${userDetails.email}`}>Profile</a> 
                    <Link to={`/progress/${userDetails.email}`}>Progress</Link>
                </>) : <></>
            }
            
            {/* NOT LOGGED IN */}
            { !userDetails.accountType ? (
                <>
                    Not Logged In
                    <Link to="/home">Home</Link> 
                    <Link to="/login">Login</Link> 
                    <Link to="/signup">Signup</Link> 
                </>) : <></>
            }

            <Link to="/login" onClick={() => localStorage.removeItem('formData')}>
                <button>LOG OUT</button>
            </Link>

        </div>
    );
}

export default Navbar;
