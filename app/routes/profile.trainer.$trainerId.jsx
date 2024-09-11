// import ProgressRow from '../components/ProgressRow';
// import { Form, useActionData, useParams, useLoaderData } from '@remix-run/react'
// import { getDb } from '../database.server.js';
// import { redirect, json } from "@remix-run/node";
// import { Link } from '@remix-run/react';
// import Navbar from '../components/Navbar';
// import '../styles/trainerProfile.css';


// export const loader = async ({ params }) => {
//   const { trainerId } = params; 

//   const db = await getDb()
//   const trainer = await db.get('SELECT * FROM Trainers WHERE email = ?', trainerId)
//   await db.close()
//   return json({ trainer })
// }

// export const action = async ({ request }) => {
//   // for some reason not working without this function
//   return redirect("/");
// };

// export default function ClientProfile() {
//     const { trainerId } = useParams(); 
//     const { trainer } = useLoaderData();
    
//     return (
//       <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
//         <Navbar/>
//         <h1>Trainer Profile</h1>
//         <hr/>
//         { 
//           <div>
//             {/* { client.profilePicture } <br/>  */}
//             { trainer.firstName } <br/> 
//             { trainer.lastName } <br/> 
//             { trainer.email } <br/> 
//             { trainer.specialties } <br/> 
//             <div className='bio-section'>  
//             { trainer.bio } </div><br/> 
//             <Link to={"/clients/" + trainer.email}>Your Clients</Link> 
//             <hr/>
//           </div>
//         }


//       </div>
//     );
//   }
  

import ProgressRow from '../components/ProgressRow';
import { Form, useActionData, useParams, useLoaderData } from '@remix-run/react'
import { getDb } from '../database.server.js';
import { redirect, json } from "@remix-run/node";
import { Link } from '@remix-run/react';
import Navbar from '../components/Navbar';
import React, { useState, useEffect } from "react";
import '../styles/trainerProfile.css';

export const loader = async ({ params }) => {
  const { trainerId } = params; 

  const db = await getDb()
  const trainer = await db.get('SELECT * FROM Trainers WHERE email = ?', trainerId)
  await db.close()
  return json({ trainer })
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  const trainerId = formData.get("trainerId");
  const bio = formData.get("bio");
  const specialties = formData.get("specialties");

  console.log('db opening');
  const db = await getDb();
  console.log('db successfully connected');

  try {
    // Update the bio and goals for the client, leaving other fields unchanged
    await db.run(`
      UPDATE Trainers
      SET bio = ?, specialties = ?
      WHERE email = ?
    `,
    bio,      // New bio value
    specialties,    // New goals value
    trainerId  // Client ID for the row to update
    );
    
    console.log("Record updated successfully");
  } catch (error) {
    console.error("Failed to update client data: ", error);
    return json({ error: "Failed to update client data." }, { status: 400 });
  } finally {
    await db.close(); // Ensure the database connection is always closed
  }

  return redirect("/profile/trainer/" + trainerId);
};

export default function TrainerProfile() {
    const { trainerId } = useParams(); 
    const { trainer } = useLoaderData();

    const [userDetails, setUserDetails] = useState({});
    useEffect(() => {
      // Formdata: email, password, accountType
      const localFormData = localStorage.getItem('formData');
      console.log(localFormData)

      if (localFormData) {
          const parsedData = JSON.parse(localFormData);
          setUserDetails(parsedData)
      }
    }, []);
    
    return (
      <>
      <Navbar/>
      <div className="container">
        <div className="profile-header">
          <h1>Trainer Profile</h1>
        </div>

        <div>
        { userDetails.email === trainerId  &&
        <Form method='post'>
          <input type="hidden" id="trainerId" name="trainerId" value={trainerId} />
          <h4>Bio</h4>
          <textarea name="bio" rows="5" cols="50" required></textarea>
          <h4>Specialties</h4>
          <input type="text" name="specialties" required />
          <button type="submit">submit</button>
        </Form>}
        </div>

        <hr/>
        { 
          <div className="profile-details">
            <div className="profile-name">
              <span>{ trainer.firstName } { trainer.lastName }</span>
            </div>
            <div className="profile-email">
              <span>{ trainer.email }</span>
            </div>
            <div className="specialties-section">
              <h2>Specialties</h2>
              <ul>
                <li>{ trainer.specialties }</li>
              </ul>
            </div>
            <div className="bio-section">  
              <h2>Bio</h2>
              <p>{ trainer.bio }</p>
            </div> 
            <div className="link-section">
              <Link to={"/clients/" + trainer.email}>Your Clients</Link> 
            </div>
          </div>
        }
      </div>
      </>
    );
}
