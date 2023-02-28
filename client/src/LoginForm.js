import React, { useState } from "react"; 

function LoginForm() {
	// ingestion 
	const [userName, setUserName] = useState(''); 
	const [password, setPassword ] = useState('');

	//error checking states 
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false); 

	// name change handler
	const handleUserName = (e) => {
		setUserName(e.target.value);
		setSubmitted(false);
	}

	// name change handler
	const handlePassword = (e) => {
		setUserName(e.target.value);
		setSubmitted(false);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (userName === '' || password === '') {
		setError(true);
		} else {
		setSubmitted(true);
		setError(false);
		}
		};

	return (
		<div>
			<p>I am sign up!</p>
			<form>
{/* Labels and inputs for form data */}
<label className="label">Name</label>
<input onChange={handleUserName} className="input"
value={userName} type="text" />

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
	
export default LoginForm;

