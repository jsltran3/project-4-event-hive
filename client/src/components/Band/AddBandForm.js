import React, { useState } from "react";
import ChooseConcertTixDropDowm from "../ConcertTix/ChooseConcertTixDropDowm.js"
import swal from "sweetalert";
import styled from "styled-components";
// import { Error } from "./style"

function AddBandForm({ onAddBand, concertTickets, onChooseConcertTicket, chosenConcertTicket }) {
    const [errors, setErrors] = useState([]);
    const [createBandFormData, setCreateBandFormData] = useState({
        name: "",
    });

    const handleCreateBandChange = (e) => {
        setCreateBandFormData({...createBandFormData, [e.target.name]: e.target.value})
    };

    const handleCreate = (e) => {
        e.preventDefault();

        // setErrors([]);

        const id = chosenConcertTicket.id;
        // NOTE: The 'Application Controller' will handle the '@current_user' so that it already knows the session["user_id"] to use in this scenario
        // Therefore, all you need to do is pass in a fetch request to the '/concertTickets' route:
        fetch(`/concert_tickets/${id}/bands`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ 
							"name": createBandFormData["band_name"], 
							"concertTicket_id": id
						}),
        })
					.then((r) =>{
						if (r.ok) {
							r.json().then((r) => {
								onAddBand(r)
							});
						} else {
							r.json().then((err) => setErrors(err.errors))

						}
					});
        // .then((response) => response.json())
        // // NOTE: This is done to send up the new concertTicket up to the parent component, 'App.js', accordingly:
        // .then((newBand) => onAddBand(newBand));
		

    }

    return (
        <div>
            <ChooseConcertTixDropDowm concertTickets={concertTickets} onChooseConcertTicket={onChooseConcertTicket} />
            <h2>Add New Band</h2>
            <form>
                <label htmlFor="name">Name of Band:</label>
                <br />
                <input onChange={handleCreateBandChange} type="text" id="name" name="band_name"/>
                <br />
                <input onClick={handleCreate} type="submit"/>
								<form>
        {/* {errors.map((err) => (
          <Error key={err}>{err}</Error>
        ))} */}
				{errors.length > 0 && (
        <ul className="errors" style={{ color: "red" }}>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      </form>
            </form>
        </div>
    )

}

// function Error({ children }) {
//   return (
//     <Wrapper>
//       <Alert>!</Alert>
//       <Message>{children}</Message>
//     </Wrapper>
//   );
// }

const Wrapper = styled.div`
  color: red;
  background-color: mistyrose;
  border-radius: 6px;
  display: flex;
  padding: 8px;
  align-items: center;
  gap: 8px;
  margin: 8px 0;
`;

const Alert = styled.span`
  background-color: white;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  font-weight: bold;
  display: grid;
  place-content: center;
`;

const Message = styled.p`
  margin: 0;
`;

const FormField = styled.div`
  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

export default AddBandForm;