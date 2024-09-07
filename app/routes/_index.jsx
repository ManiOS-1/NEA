import React, { useState } from "react";
import logo from '../images/logo.svg';
import '../styles/App.css';
import { Login } from "../components/Login";
import { Register } from "../components/Register";
//import { Signup } from "../components/Signup";

// app/routes/index.jsx
import { redirect } from "@remix-run/node";

export let loader = async () => {
  return redirect("/login");
};

export default function Index() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      }
    </div>
    
  );
}
