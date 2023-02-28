import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Routes  } from "react-router-dom";
import Login from './Login';
import About from './Home.js';
import SignupForm from './LoginForm.js';
import NavBar from './NavBar.js';
import ConcertTicket from "./components/ConcertTix/ConcertTickets";
import Band from "./components/Band/Band";




function App() {
  const [user, setUser] = useState(null);
  const [concertTicket, setconcertTicket] = useState([]);
  const [chosenConcert, setChosenConcert] = useState({});
  const [concertTicketIndex, setConcertTicketIndex] = useState("");
  const [bandOptions, setBandOptions] = useState([]);
  const [bandId, setbandId] = useState("");
  const [bandIndex, setBandIndex] = useState("");

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json()
        .then((user) => {
          setUser(user);
        })
    }
  });
  }, []);
  
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
