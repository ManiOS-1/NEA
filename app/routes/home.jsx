import { Link, useLoaderData } from "@remix-run/react";
import * as React from 'react';
import { json } from "@remix-run/node";
//import Progress from 'progress'

import { getDb } from '../database.server.js'

export const loader = async () => {
  const db = await getDb()
  const trainers = await db.all('SELECT * FROM Trainers')
  await db.close()
  return json({ trainers })
}

export default function Home() {

    let { trainers } = useLoaderData();

    return (
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <div>
            {/* CODE HERE GOES ON TOP LEFT */}
            WEBAPP!!
          </div>

          <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
            {/* CODE HERE GOES ON TOP RIGHT */}
            <button>foo</button>
            <button>bar</button>
            <button>baz</button>
          </div>
        </div>

        { JSON.stringify(trainers) }


        <Link to="/timetable">
            <button style={{backgroundColor: "lightBlue", width: "90%", height: "200px", marginLeft: "70px", marginRight: "70px", marginBottom: "30px", marginTop: "70px", borderRadius: "20px", fontSize: "3rem", textAlign: "left", paddingLeft: "50px"}}>Timetable</button>
        </Link><br/>

        <Link to="/progress">
            <button style={{backgroundColor: "lightGreen", width: "90%", height: "200px", marginLeft: "70px", marginRight: "70px", marginBottom: "30px", borderRadius: "20px", fontSize: "3rem", textAlign: "right", paddingRight: "50px"}}>Progress</button>
        </Link><br/>

        <Link to="/sessions">
            <button style={{backgroundColor: "lightPink", width: "90%", height: "200px", marginLeft: "70px", marginRight: "70px", marginBottom: "30px", borderRadius: "20px", fontSize: "3rem", textAlign: "left", paddingLeft: "50px"}}>Sessions</button>
        </Link>
      </div>
    );
  }
  