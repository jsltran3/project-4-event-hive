import React from "react"; 
import './App.css';
import Login from './Login.js';
import Home from './Home.js';
import Signup from './Signup.js';
import { BrowserRouter, Route, Switch } from "react-router-dom";


function App() {
  return (
    <div className="App">
   <Switch>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
    </Switch>

    </div>
  );
}

export default App;
