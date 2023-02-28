import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Routes  } from "react-router-dom";
import './App.css';
import Login from './Login';
import About from './Home.js';
import SignupForm from './SignupForm.js';
import NavBar from './NavBar.js';




function App() {
  
  return (
    <div className="App">
      <NavBar />
        <Routes>
          <Route path="/Signup" element={ <SignupForm/> } />
          <Route path="/" element={ <About/> } />
          <Route path="/Login" element={ <Login/> } />
        </Routes>
    </div>
  );
}
  
  
//   return (
//     <div className="App">
//       <p>wtf</p>
 
//       <NavBar />
//       <Routes >
//       <Route path="/">
//         <Home />
//       </Route>
//       <Route path="/signup">
//         <SignupForm />
//       </Route>
//       <Route path="/login">
//         <Login />
//       </Route>
//       <Routes >
//     </div>
//   );
// }

export default App;
