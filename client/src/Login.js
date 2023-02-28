import React, { useState } from "react"; 
// import styled from "styled-components";
import LoginForm from "./LoginForm.js";
import SignupForm from "./LoginForm.js";
// import { Button } from "../styles";


//puttinh it all togethet
function Login() {
	const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

	function handleSubmit(e) {
    // e.preventDefault();
    // setIsLoading(true);
    // fetch("/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ username, password }),
    // }).then((r) => {
    //   setIsLoading(false);
    //   if (r.ok) {
    //     r.json().then((user) => onLogin(user));
    //   } else {
    //     r.json().then((err) => setErrors(err.errors));
    //   }
    // });
  }

    return (

      <div>
        <p>I am login</p>
			<form onSubmit={handleSubmit}>
      <label>Username</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      
      
      <label>Password</label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      
      
        <button variant="fill" color="primary" type="submit">
          {isLoading ? "Loading..." : "Login"}
        </button>
      
      
        {/* {errors.map((err) => (
          <Error key={err}>{err}</Error>
        ))} */}
      
    </form>
    </div>
  );
  
}


export default Login;