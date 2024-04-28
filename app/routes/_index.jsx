import React, { useState } from "react";
import logo from '../images/logo.svg';
import '../styles/App.css';
import { Login } from "../components/Login";
import { Register } from "../components/Register";


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
