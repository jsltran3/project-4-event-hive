import React from "react"; 
import './App.css';
import Login from './Login.js';
import Home from './Home.js';
import SignupForm from './SignupForm.js';
import NavBar from './NavBar.js';
import { BrowserRouter, Route, Switch } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <p>wtf</p>
 
      <NavBar />
      <Switch>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/signup">
        <SignupForm />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
    </Switch>

    </div>
  );
}

export default App;
