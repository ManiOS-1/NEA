// import '../styles/progress.css';
// import ProgressRow from '../components/ProgressRow';
// import { Form, useActionData, useParams, useLoaderData } from '@remix-run/react'
// import { getDb } from '../database.server.js';
// import { redirect, json } from "@remix-run/node";
// import { Link } from '@remix-run/react';
// import Navbar from '../components/Navbar';
// import React, { useEffect } from "react";

// export const loader = async ({ params }) => {
//   const { clientId } = params; 

//   const db = await getDb()
//   const client = await db.get('SELECT * FROM Clients WHERE email = ?', clientId)
//   await db.close()
//   return json({ client })
// }

// export const action = async ({ request }) => {
//   // for some reason not working without this function
//   return redirect("/");
// };

// export default function ClientProfile() {
//     const { clientId } = useParams(); 
//     const { client } = useLoaderData();
//     console.log("Home component rendered");

//     return (
//       <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
//         <Navbar/>
//         <h1>Client Profile</h1>

//         <hr/>
//         { 
//           <div>
//             {/* { client.profilePicture } <br/>  */}
//             { client.firstName } <br/> 
//             { client.lastName } <br/> 
//             { client.email } <br/> 
//             { client.goals } <br/> 
//             <Link to={"/progress/" + client.email}>Your Progress</Link> 
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
import '../styles/clientProfile.css';
import React, { useState, useEffect } from "react";


export const loader = async ({ params }) => {
  const { clientId } = params; 

  const db = await getDb()
  const client = await db.get('SELECT * FROM Clients WHERE email = ?', clientId)
  await db.close()
  return json({ client })
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  const clientId = formData.get("clientId");
  const bio = formData.get("bio");
  const goals = formData.get("goals");

  console.log('db opening');
  const db = await getDb();
  console.log('db successfully connected');

  try {
    // Update the bio and goals for the client, leaving other fields unchanged
    await db.run(`
      UPDATE Clients
      SET bio = ?, goals = ?
      WHERE email = ?
    `,
    bio,      // New bio value
    goals,    // New goals value
    clientId  // Client ID for the row to update
    );
    
    console.log("Record updated successfully");
  } catch (error) {
    console.error("Failed to update client data: ", error);
    return json({ error: "Failed to update client data." }, { status: 400 });
  } finally {
    await db.close(); // Ensure the database connection is always closed
  }

  return redirect("/profile/client/" + clientId);
};

export default function ClientProfile() {
    const { clientId } = useParams(); 
    const { client } = useLoaderData();

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
      <div className="container">
        <Navbar/>
        <div className="profile-header">
          <h1>Client Profile</h1>
        </div>

        { userDetails.email === clientId &&
        <Form method='post'>
          <input type="hidden" id="trainerId" name="clientId" value={clientId} />
          <h4>Bio</h4>
          <textarea name="bio" rows="5" cols="50" required></textarea>
          <h4>Goals</h4>
          <input type="text" name="goals" required />
          <button type="submit">submit</button>
        </Form>}

        <hr/>
        { 
          <div className="profile-details">
            <div className="profile-name">
              <span>{ client.firstName } { client.lastName }</span>
            </div>
            <div className="profile-email">
              <span>{ client.email }</span>
            </div>
            <div className="bio-section">
              <h2>Bio</h2>
              <p>{ client.bio }</p>
            </div> 
            <div className="goals-section">
              <h2>Goals</h2>
              <ul>
                <li>{ client.goals }</li>
              </ul>
            </div>
            <div className="link-section">
              <Link to={"/progress/" + client.email}>Your Progress</Link>
            </div>
          </div>
        }
      </div>
    );
}
