import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "./styles"


function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  // Get the current date timestamp to determine the current hour for 'dark mode' settings:
  // const currentDate = new Date();
  // const currentHour = `${currentDate.getHours()}`;
  // setHour(currentHour);
  // console.log("currentHour in 24 hour clock: ", currentHour);

  // if (currentHour > 17) {
  //   context.updateContext({color1: "black"});
  // }

  // Used these pages as references for the '/concerttickets' route:
  // https://stackoverflow.com/questions/38839510/forcing-a-react-router-link-to-load-a-page-even-if-were-already-on-that-page
  // https://stackoverflow.com/questions/38809989/react-router-link-not-causing-component-to-update-within-nested-routes


          // <Button as={Link} onClick={() => this.forceUpdate} to="/concerttickets"></Button>

  return (
    <>
      <Wrapper>
        <Logo>
          <h1>Event Hive</h1>
        </Logo>
        <Nav>
          <Button as={Link} to="/about">
            About
          </Button> 
          <Button as={Link} to="/concerttickets">
            Concert Tickets
          </Button>
          <Button as={Link} to="/bands">
            Bands
          </Button>
          <Button as={Link} to="/viewconcerttickets">
            View All Concert Tickets
          </Button>
          <Button variant="outline" onClick={handleLogoutClick}>
            Logout
          </Button>
        </Nav>
      </Wrapper>
    </>
  );
}

// This is what will utilize the 'useContext' hook to change the theme of the app dependent upon the time of day:
// function ThemeDiv() {
//   return (
//       <div>
//         styled.div`background-color: ${currentTheme.background};`
//       </div>
//   );
// }

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

const Logo = styled.h1`
  font-family: "Permanent Marker", cursive;
  font-size: 2rem;
  color: red;
  margin: 0;
  line-height: 1;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 4px;
  position: absolute;
  left: 20px;
`;

export default NavBar;

// function ThemeDiv({ currentHour }) {
//     // const theme = useContext(ThemeContext)

// const themedDiv = 
//       styled.div`
//           background-color: ${theme.light.background}
//     `;

//     const themedDiv = styled.div`
//       background-color: black;
//     `

//     return themedDiv;
// }
