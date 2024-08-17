import React, { useState } from "react";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [age, setAge] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [accountType, setAccountType] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }
    
    return (
        <div className="auth-form-container">
            <h2>Register</h2>
         <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="first name">First Name</label> 
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} name="first_name" id="first_name" placeholder="John"/>

            <label htmlFor="last name">Last Name</label> 
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} name="last_name" id="last_name" placeholder="Doe"/>

            <label htmlFor="mobile number">Mobile Number</label> 
            <input value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} name="mobile_number" id="mobile_number" placeholder="+44"/>

            <label htmlFor="age">Age</label> 
            <input value={age} onChange={(e) => setAge(e.target.value)} name="age" id="age" placeholder="--"/>

            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />

            <label htmlFor="password">Password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)}type="password" placeholder="********" id="password" name="password" />

            <label htmlFor="confirm password">Confirm Password</label>
            <input value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)}type="confirm password" placeholder="********" id="confirm password" name="confirm password" />

            <label htmlFor="account type">Account Type (client/trainer)</label>
            <input value={accountType} onChange={(e) => setAccountType(e.target.value)}type="account_type" placeholder="client/trainer" id="account_type" name="account_type" />

            <button type="submit">Register</button>
          </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Sign in here.</button>
        </div>
    )
}