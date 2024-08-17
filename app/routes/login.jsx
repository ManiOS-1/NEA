import React, { useState, useEffect } from "react";
import logo from '../images/logo.svg';
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import { Form, useActionData } from '@remix-run/react'
import { useNavigate } from 'react-router-dom';
import { redirect, json } from "@remix-run/node";
import { Link } from '@remix-run/react';
import '../styles/App.css';

import { getDb } from '../database.server.js';

export const action = async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const accountType = formData.get("accountType");
    console.log(accountType)

    const db = await getDb()

    let user;

    try {
        if (!email || !password || !accountType) {
            return json({ error: "All fields are required" }, { status: 400 });
        } else {
            if (accountType === "Trainer") {
                user = await db.get('SELECT * FROM trainers WHERE email = ?', email)
            } else if (accountType === "Client") {
                user = await db.get('SELECT * FROM clients WHERE email = ?', email)    
            } 
        }
        console.log(user);

        if (!user) {
            return json({ error: "Invalid email or password" }, { status: 400 });
        }
        
        if (user.password !== password) {
            return json({ error: "Invalid email or password" }, { status: 400 });
        }
    } catch (error) {
        return json({ error: "An unexpected error occurred" }, { status: 500 });
    } 

    await db.close()
  
    // Redirect to a different page after successful submission
    return redirect("/home");
    // return json({ success: true, user });
}

export default function Index() {
  const actionData = useActionData();
  const navigate = useNavigate();

  const handleFormSubmit = (event) => {
    event.preventDefault(); 
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    localStorage.setItem("formData", JSON.stringify(data));
    event.target.submit();
  };

  return (
    <div className="App" >

        <div className="auth-form-container signup">
            <h2>Login</h2>

            <Form method='post' onSubmit={handleFormSubmit}>
                { actionData?.error && <div style={{ color: "red" }}><b>{actionData.error}</b></div> } 

                <div>
                    <label>
                        Email <br/> <input type="text" name="email" required />
                    </label>
                </div>

                <div>
                    <label>
                        Password <br/> <input type="password" name="password" required />
                    </label>
                </div>

                <div>
                    <b>Choose Account Type</b><br/>
                    <input type="radio" id="trainer" name="accountType" value="Trainer"/>
                    <label for="trainer">Trainer</label><br/>
                    <input type="radio" id="client" name="accountType" value="Client"/>
                    <label for="client">Client</label><br/>
                </div>

                <button type="submit">Login</button>
                <br/>
                <Link to="/signup">Go to Signup</Link> 
            </Form>
        </div>
    </div>
  );
}
