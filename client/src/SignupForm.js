import React, { useState } from "react"; 

function SignupForm() {
	// ingestion 
	const [userName, setUserName] = useState(''); 
	const [password, setPassword ] = useState('');

	//error checking states 
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false); 

	// name change handler
	const handleName = (e) => {
		setUserName(e.target.value);
		setSubmitted(false);
	}

	//email change  handler
	const handleEmail = (e) => {
		setUserName(e.target.value);
		setSubmitted(false);
		};

const handlePassword = (e) => {
	setPassword(e.target.value);
	setSubmitted(false);
	};

	// Handling the form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		if (userName === '' || password === '') {
		setError(true);
		} else {
		setSubmitted(true);
		setError(false);
		}
		};

	// Showing success message
const successMessage = () => {
	return (
	<div
		className="success"
		style={{
		display: submitted ? '' : 'none',
		}}
	>
	<h1>User {userName} successfully registered!!</h1>
	</div>
	)
	};
	
	// Showing error message if error is true
	const errorMessage = () => {

	return (
		<div className="form">
		<div>
		<h1>User Registration</h1>
		</div>
		
		{/* Calling to the methods */}
		<div className="messages">
		{errorMessage()}
		{successMessage()}
		</div>
		
		<form>
		{/* Labels and inputs for form data */}
		<label className="label">Name</label>
		<input onChange={handleName} className="input"
		value={userName} type="text" />
		
		{/* <label className="label">Email</label>
		<input onChange={handleEmail} className="input"
		value={email} type="email" /> */}
		
		<label className="label">Password</label>
		<input onChange={handlePassword} className="input"
		value={password} type="password" />
		
		<button onClick={handleSubmit} className="btn" type="submit">
		Submit
		</button>
		</form>
		</div>
		);
		}

	}
export default SignupForm;