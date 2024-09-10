import '../styles/progress.css';
import ProgressRow from '../components/ProgressRow';
import { Form, useActionData, useParams, useLoaderData } from '@remix-run/react'
import { getDb } from '../database.server.js';
import { redirect, json } from "@remix-run/node";
import Navbar from "../components/Navbar";

export const loader = async ({ params }) => {
  const { clientId } = params; 

  const db = await getDb()
  const exercises = await db.all('SELECT * FROM Exercises WHERE client = ?', clientId)
  await db.close()
  return json({ exercises })
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  const clientId = formData.get("clientId");
  const exercise = formData.get("exercise");
  const weight = formData.get("weight");
  const repsTime = formData.get("repsTime");
  const notes = formData.get("notes");

  console.log('db opening ')
  const db = await getDb();
  console.log('db successfully connected')

  try {
    await db.run('INSERT INTO Exercises (client, exercise, weight, repsTime, notes) VALUES (?, ?, ?, ?, ?)',
        clientId,
        exercise,
        weight,
        repsTime,
        notes
    )
  } catch (error) {
    console.log("failed to log: ", error)
      // return json({ error: "Failed to log." }, { status: 400 });
  }

  await db.close()

  // Redirect to a different page after successful submission
  return redirect("/progress/" + clientId);
  // return redirect("/home")
  // return null;
};

export default function Progress() {
    const { clientId } = useParams(); // Access the clientId from the params object
    const { exercises } = useLoaderData();

    return (
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
        <Navbar/>
        <h2>Your Progression and Statistics</h2> 

        <br/>
        
        <div>
          <h1>Enter your progress</h1>
          <Form method='post'>
              <input type="hidden" id="clientId" name="clientId" value={clientId} />
              <h4>Exercises</h4>
              <input type="text" name="exercise" required />
              <h4>Weight</h4>
              <input type="text" name="weight" required />
              <h4>Reps/Time</h4>
              <input type="text" name="repsTime" required />
              <h4>Notes</h4>
              <input type="text" name="notes" required />
              <button type="submit">submit</button>
          </Form>
        </div>

        <table>
          <tr>
            <th>Exercise</th>
            <th>Weight</th>
            <th>reps/times</th>
            <th>Notes</th>
          </tr>
          
          { exercises.map(exercise => 
            <ProgressRow exercise={exercise.exercise} weight={exercise.weight} reps={exercise.repsTime} notes={exercise.notes} />
          )}
        </table>
      </div>
    );
  }
  