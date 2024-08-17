import React, { useState } from "react";
import logo from '../images/logo.svg';
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import { Form, useActionData } from '@remix-run/react'
import { redirect, json } from "@remix-run/node";
import { Link } from '@remix-run/react';
import '../styles/App.css';

import { getDb } from '../database.server.js';

export const action = async ({ request }) => {
    const formData = await request.formData();
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const age = formData.get("age");
    const mobileNumber = formData.get("mobileNumber");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const accountType = formData.get("accountType");
    console.log(accountType)

    const db = await getDb()

    if (confirmPassword !== password) {
        return json({ error: "Passwords do not match!" }, { status: 400 });
    } else if (!firstName || !lastName || !age || !mobileNumber || !email || !password || !confirmPassword || !accountType) {
        return json({ error: "All fields are required" }, { status: 400 });
    } else {
        if (accountType === "Trainer") {
            try {
                await db.run('INSERT INTO trainers (firstName, lastName, age, mobileNumber, email, password) VALUES (?, ?, ?, ?, ?, ?)',
                    firstName,
                    lastName,
                    age,
                    mobileNumber,
                    email,
                    password
                )
            } catch (error) {
                return json({ error: "This email has already been taken!" }, { status: 400 });
            }
        } else if (accountType === "Client") {
            try {
                await db.run('INSERT INTO clients (firstName, lastName, age, mobileNumber, email, password) VALUES (?, ?, ?, ?, ?, ?)',
                    firstName,
                    lastName,
                    age,
                    mobileNumber,
                    email,
                    password
                )
            } catch (error) {
                return json({ error: "This email has already been taken!" }, { status: 400 });
            }
        } 
    }

    await db.close()
  
    // Redirect to a different page after successful submission
    return redirect("/home");
};

export default function Index() {
  const actionData = useActionData();

  return (
    <div className="App" >

        <div className="auth-form-container signup">
            <h2>Register</h2>

            <Form method='post'>
                { actionData?.error && <div style={{ color: "red" }}><b>{actionData.error}</b></div> } 
                <div>
                    <label>
                        First Name <br/> <input type="text" name="firstName" required />
                    </label>
                </div>

                <div>
                    <label>
                        Last Name <br/> <input type="text" name="lastName" required />
                    </label>
                </div>

                <div>
                    <label>
                        Age <br/> <input type="number" name="age" required />
                    </label>
                </div>

                <div>
                    <label>
                        Mobile Number <br/> <input type="text" name="mobileNumber" required />
                    </label>
                </div>

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
                    <label>
                        Confirm Password <br/> <input type="password" name="confirmPassword" required />
                    </label>
                </div>

                <div>
                    <b>Choose Account Type</b><br/>
                    <input type="radio" id="trainer" name="accountType" value="Trainer"/>
                    <label for="trainer">Trainer</label><br/>
                    <input type="radio" id="client" name="accountType" value="Client"/>
                    <label for="client">Client</label><br/>
                </div>

                <button type="submit">Sign Up</button>
                <br/>
                <Link to="/login">Go to login</Link> 
            </Form>
        </div>
    </div>
  );
}
