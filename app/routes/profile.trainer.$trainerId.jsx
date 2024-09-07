import '../styles/progress.css';
import ProgressRow from '../components/ProgressRow';
import { Form, useActionData, useParams, useLoaderData } from '@remix-run/react'
import { getDb } from '../database.server.js';
import { redirect, json } from "@remix-run/node";
import { Link } from '@remix-run/react';

export const loader = async ({ params }) => {
  const { trainerId } = params; 

  const db = await getDb()
  const trainer = await db.get('SELECT * FROM Trainers WHERE email = ?', trainerId)
  await db.close()
  return json({ trainer })
}



export default function ClientProfile() {
    const { trainerId } = useParams(); 
    const { trainer } = useLoaderData();
    
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
        
        <hr/>
        { 
          <div>
            {/* { client.profilePicture } <br/>  */}
            { trainer.firstName } <br/> 
            { trainer.lastName } <br/> 
            { trainer.email } <br/> 
            { trainer.specialties } <br/> 
            { trainer.bio } <br/> 
            <Link to={"/clients/" + trainer.email}>Your Clients</Link> 
            <hr/>
          </div>
        }


      </div>
    );
  }
  