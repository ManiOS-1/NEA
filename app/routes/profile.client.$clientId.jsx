import '../styles/progress.css';
import ProgressRow from '../components/ProgressRow';
import { Form, useActionData, useParams, useLoaderData } from '@remix-run/react'
import { getDb } from '../database.server.js';
import { redirect, json } from "@remix-run/node";
import { Link } from '@remix-run/react';
import Navbar from '../components/Navbar';
import React, { useEffect } from "react";

export const loader = async ({ params }) => {
  const { clientId } = params; 

  const db = await getDb()
  const client = await db.get('SELECT * FROM Clients WHERE email = ?', clientId)
  await db.close()
  return json({ client })
}

export default function ClientProfile() {
    const { clientId } = useParams(); 
    const { client } = useLoaderData();

    return (
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
        { "DOES THIS RENDER!"}  
        <Navbar/>
        <hr/>
        { 
          <div>
            {/* { client.profilePicture } <br/>  */}
            { client.firstName } <br/> 
            { client.lastName } <br/> 
            { client.email } <br/> 
            { client.goals } <br/> 
            <Link to={"/progress/" + client.email}>Your Progress</Link> 
            <hr/>
          </div>
        }


      </div>
    );
  }
  