import React from 'react';
import "../styles/Timetable.css";
import Navbar from "../components/Navbar";
import { getDb } from '../database.server.js';
import { redirect, json } from "@remix-run/node";
import { Form, useActionData, useParams, useLoaderData } from '@remix-run/react'


export const loader = async ({ params }) => {
  const { clientId } = params; 

  const db = await getDb()
  const sessions = await db.all('SELECT * FROM Sessions WHERE client = ?', clientId)
  await db.close()
  return json({ sessions })
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  const clientId = formData.get("clientId");
  const trainerId = formData.get("trainerId");
  const date = formData.get("date");
  const time = formData.get("time");
  const focus = formData.get("focus");

  console.log('db opening ')
  const db = await getDb();
  console.log('db successfully connected')

  try {
    await db.run(`
      INSERT OR REPLACE INTO Sessions (id, client, trainer, date, time, focus, duration)
      VALUES (
          (SELECT id FROM Sessions WHERE client = ? AND trainer = ? AND date = ? AND time = ?),
          ?, ?, ?, ?, ?, ?
      )`,
      clientId,
      trainerId,
      date,
      time,
      clientId,
      trainerId,
      date,
      time,
      focus,
      1
    );
  } catch (error) {
    console.log("failed to log: ", error)
      // return json({ error: "Failed to log." }, { status: 400 });
  }

  await db.close()

  return redirect("/timetable/client/" + clientId);
};

const Timetable = () => {
  // Monday - Sunday
  // 6am - 6pm
  // database: trainer, client, time, date, duration, focus
  // time: 1, 2, 3, ..., 22, 23 (hours in the day)
  // date: monday, tuesday, ..., saturday

  const { clientId } = useParams(); 
  const { sessions } = useLoaderData();
  
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const hours = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const findSession = (day, hour) => {
    return sessions.find(session => session.date.toLowerCase() === day && parseInt(session.time) === hour);
  };

  return (
    <>
      <Navbar/>


      {/* clientId, trainerId, date, time, focus */}
      {/* Client Cannot Add To The Timetable */}
      {/* <Form method='post'>
          <input type="hidden" id="clientId" name="clientId" value={clientId} />
          <h4>Trainer Email</h4>
          <input type="text" name="trainerId" required />
          <h4>Date (monday-sunday)</h4>
          <input type="text" name="date" required />
          <h4>Time (6-15)</h4>
          <input type="text" name="time" required />
          <h4>Focus</h4>
          <input type="text" name="focus" required />
          <button type="submit">submit</button>
      </Form> */}
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>Time</th>
              {days.map(day => (
                <th key={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map(hour => (
              <tr key={hour}>
                <td>{`${hour}:00`}</td>
                {days.map(day => {
                  const session = findSession(day, hour);
                  return (
                    <td key={`${day}-${hour}`}>
                      {session 
                        ? <>{`${session.focus} with`} <a href={`/profile/trainer/${session.trainer}`}>{session.trainer}</a></>
                        : '—'
                      }
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Timetable;
