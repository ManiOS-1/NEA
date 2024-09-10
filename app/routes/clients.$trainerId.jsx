import '../styles/progress.css';
import ProgressRow from '../components/ProgressRow';
import { Form, useActionData, useParams, useLoaderData } from '@remix-run/react'
import { getDb } from '../database.server.js';
import { redirect, json } from "@remix-run/node";
import { Link } from '@remix-run/react';
import Navbar from '../components/Navbar';

export const loader = async ({ params }) => {
  const { trainerId } = params; 

  const db = await getDb()
  const clients = await db.all('SELECT * FROM Clients WHERE trainer = ?', trainerId)
  await db.close()
  return json({ clients })
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  const clientId = formData.get("clientId");
  const trainerId = formData.get("trainerId");

  console.log('db opening ')
  const db = await getDb();
  console.log('db successfully connected')

  try {
    await db.run('UPDATE Clients SET trainer = ? WHERE email = ?',
        trainerId,
        clientId,
    )
  } catch (error) {
    console.log("failed to log: ", error)
      // return json({ error: "Failed to log." }, { status: 400 });
  }

  await db.close()

  // Redirect to a different page after successful submission
  return redirect("/clients/" + trainerId);
  // return redirect("/home")
  // return null;
};

export default function ClientList() {
    const { trainerId } = useParams(); 
    const { clients } = useLoaderData();
    
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
        <Navbar/>
        <>Add A New Client (enter the client's email)</> 
        <Form method='post'>
          <input type="hidden" id="trainerId" name="trainerId" value={trainerId} />
          <input type="text" name="clientId" required />
          <button type="submit">submit</button>
        </Form>
        
        <h2>Your Clients</h2> 
        <hr/>
        { clients.map(client =>
          <div>
            {/* { client.profilePicture } <br/>  */}
            { client.firstName } <br/> 
            { client.lastName } <br/> 
            { client.email } <br/> 
            { client.goals } <br/> 
            <Link to={"/progress/" + client.email}>Their Progress</Link> 
            <hr/>
          </div>
        )}

      </div>
    );
  }
  