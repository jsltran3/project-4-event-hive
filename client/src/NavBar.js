import React, { useContext, useEffect } from "react";
import { UserContext } from "./contexts/userContext";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button, Box } from "./styles";


function NavBar({ user, setUser }) {
  const {userInfo} = useContext(UserContext)

  useEffect(() => {
    if (userInfo.username) console.table(userInfo)
  }, [userInfo])
  
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }


  return (
    <>
      <Wrapper>
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
          {/* <div>
            {userInfo.username}
          </div> */}
          <Box>
            {userInfo.username}
          </Box>

          
        </Nav>
      </Wrapper>

    </>
  );
}



const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

const Logo = styled.h1`
  font-family: "Permanent Marker", regular;
  font-size: 2rem;
  color: Yellow;
  margin: 100;
  line-height: 1;
  -webkit-text-stroke: 2px black;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 200px;



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

