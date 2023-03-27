import React, { useEffect, useState, useContext } from "react";
import { Route, Routes  } from "react-router-dom";
import { UserContext } from "./contexts/userContext";
import Login from './Login';
import About from './About.js';
import NavBar from './NavBar.js';
import ConcertTicket from "./components/ConcertTix/ConcertTickets";
import Band from "./components/Band/Band";
import ViewConcertTix from "./components/ConcertTix/ViewConcertTix";
import styled from "styled-components";




function App() {
  const [user, setUser] = useState(null);
  const [concertTickets, setConcertTickets] = useState([]);
  const [chosenConcertTicket, setChosenConcertTicket] = useState({});
  const [concertTicketIndex, setConcertTicketIndex] = useState("");
  const [bandOptions, setBandOptions] = useState([]);
  const [bandId, setBandId] = useState("");
  const [bandIndex, setBandIndex] = useState("");
  const {setUserInfo} = useContext(UserContext)


  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json()
        .then((user) => {
          setUser(user); setUserInfo(user);
          setUser(user);

        })
    }
  });
  }, []);

  useEffect(() => {
    if (chosenConcertTicket) {
      if (chosenConcertTicket.bands) {
        let bandOptions = chosenConcertTicket.bands.map((band) => {
            return (
                <option key={band.id} value={band.name}>{band.name}</option>
            )
        });

        setBandOptions(bandOptions);
      }
    }
  }, [chosenConcertTicket]);

  if (!user) return <Login onLogin={setUser} />;

  function handleFetchConcertTickets(fetchedConcertTickets) {
    setConcertTickets(fetchedConcertTickets)
  }

  function handleAddConcertTicket(newConcertTicket) {
    const updatedConcertTicketsArray = [...concertTickets, newConcertTicket];
    setConcertTickets(updatedConcertTicketsArray);
  }

  function handleEditConcertTicket(editedConcertTicket) {
    setConcertTickets((concertTickets) => 
      concertTickets.map((concertTicket) => {
        return concertTicket.id === editedConcertTicket.id ? editedConcertTicket : concertTicket;
      })
    );
  }

  function handleDeleteConcertTicket(deletedConcertTicket) {
    console.log("handleDeleteConcertTicket function called");
    console.log("deletedConcertTicket: ", deletedConcertTicket);
    setConcertTickets((concertTickets) =>
      concertTickets.filter((concertTicket) => concertTicket.id !== deletedConcertTicket.id)
    );
  }

  function handleChooseConcertTicket(e) {
    const match = concertTickets.find(item => item.title == e.target.value);

    setChosenConcertTicket(match);

    let index = concertTickets.map(concertTicket => concertTicket.title).indexOf(e.target.value)

    setConcertTicketIndex(index);
  }

  function handleAddBand(newBand) {
    concertTickets.map((concertTicket) => {
      if (concertTicket.id == chosenConcertTicket.id) {
        const updatedBandsArray = [...concertTicket.bands, newBand];

        let bandOptions = updatedBandsArray.map((band) => {
            return (
                <option key={band.id} value={band.name}>{band.name}</option>
            )
        });

        setBandOptions(bandOptions);
        let tempArray = [...concertTickets];
        tempArray[concertTicketIndex].bands.push(newBand);
        setConcertTickets(tempArray) ;
      } 
      else {
        console.log("Match not found within 'handleAddNewBand!");
      }});
  }

  function handleChangeBandInfo(chosenBandId, chosenBandIndex) {
    setBandId(chosenBandId);
    setBandIndex(chosenBandIndex);

  }

  function handleEditBand(editedBand) {
    let tempArray = [...concertTickets];
    tempArray[concertTicketIndex].bands[bandIndex] = editedBand;
    setConcertTickets(tempArray);

    let bandOptions = chosenConcertTicket.bands.map((band) => {
      return (
          <option key={band.id} value={band.name}>{band.name}</option>
      )
    });

    setBandOptions(bandOptions);
  }

  function handleDeleteBand(response, deletedBandId) {
    let tempArray = [...concertTickets];
    tempArray[concertTicketIndex].bands.splice(bandIndex, 1)
    setConcertTickets(tempArray);

    let filteredBandOptions = chosenConcertTicket.bands.map((band) => {
        return (
            <option key={band.id} value={band.name}>{band.name}</option>
        )
    });

    setBandOptions(filteredBandOptions);
  }

  return (
    <>
      <Logo>
          <h1>Event Hive</h1>
      </Logo>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route 
          path="/about" 
          element={<About user={user}/>} 
        />
        <Route 
          path="/concerttickets" 
          element={
            <ConcertTicket 
            concertTickets={concertTickets} 
            onFetchConcertTickets={handleFetchConcertTickets} 
            onChooseConcertTicket={handleChooseConcertTicket} 
            chosenConcertTicket={chosenConcertTicket}
            onAddConcertTicket={handleAddConcertTicket} 
            onEditConcertTicket={handleEditConcertTicket} 
            onDeleteConcertTicket={handleDeleteConcertTicket} 
          />
          }
        />
        <Route 
          path="/bands" 
          element={
            <Band 
              concertTickets={concertTickets} 
              onChooseConcertTicket={handleChooseConcertTicket} 
              chosenConcertTicket={chosenConcertTicket} 
              onFetchConcertTickets={handleFetchConcertTickets}
              onAddBand={handleAddBand} 
              bandOptions={bandOptions} 
              setBandOptions={setBandOptions} 
              bandId={bandId} 
              setBandId={setBandId} 
              onChangeBandInfo={handleChangeBandInfo}
              onEditBand={handleEditBand} 
              onDeleteBand={handleDeleteBand} 
            />
          }
        />
        <Route 
          path="/viewconcerttickets" 
          element={<ViewConcertTix concertTickets={concertTickets} onFetchConcertTickets={handleFetchConcertTickets} />}
        />
      </Routes>
    </>
  );
}

const Logo = styled.h1`
font-family: "Permanent Marker", regular;
font-size: 2rem;
color: Yellow;
margin: -1;
line-height: 1;
-webkit-text-stroke: 2px black;




a {
  color: inherit;
  text-decoration: none;
}
`;

export default App;

