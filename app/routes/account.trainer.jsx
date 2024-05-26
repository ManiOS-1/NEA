import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Database from 'better-sqlite3';
import { useEffect } from 'react';

// BACKEND
export const loader = async () => {
  const db = new Database('app/databaseForNEA.db');

  // const insert = db.prepare('INSERT INTO Client (name, email, password, dateOfBirth) VALUES (?, ?, ?, ?)');
  // insert.run('John Doe', 'john@example.com', 'password123', '26/04/00');
  
  const client = db.prepare('SELECT name, email FROM Client').all();

  return json({ client });
};

// FRONTEND
export default function AccountTrainer() {
  const data = useLoaderData();
  

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      Account for personal trainers! <br/>
      
      {/* { data } */}
      {/* {data.age}
      {data.subjects} */}
      {/* { JSON.stringify(data) } */}
      <p>{data.client[0].Email}</p>
    </div>
  );
}

// { "client":
//   [
//     {
//       "Name":"John Doe",
//       "Email":"john@example.com"
//     }
//   ]
// }