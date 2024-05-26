import { Link } from "@remix-run/react";


export default function Home() {



    return (
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
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
  