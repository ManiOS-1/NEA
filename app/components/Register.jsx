import React, { useState } from "react";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }
    
    return (
        <div className="auth-form-container">
            <h2>Register</h2>
         <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label> 
            <input value={name} name="name" id="name" placeholder="John Doe"/>
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">Password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)}type="password" placeholder="********" id="password" name="password" />
            <label htmlFor="confirm password">Confirm Password</label>
            <input value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)}type="confirm password" placeholder="********" id="confirm password" name="confirm password" />
            <button type="submit">Log In</button>
          </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Sign in here.</button>
        </div>
    )
}