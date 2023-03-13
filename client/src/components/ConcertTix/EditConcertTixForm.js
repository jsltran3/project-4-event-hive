import React, { useEffect, useState } from "react";
import ChooseConcertTicketDropdowm from "./ChooseConcertTixDropDowm.js"

function EditConcertTicketForm({ concertTickets, onChooseConcertTicket, onEditConcertTicket, onDeleteConcertTicket, chosenConcertTicket }) {
    useEffect(() => {
        setEditConcertTicketFormData({
            title: chosenConcertTicket.title

        })
    }, [chosenConcertTicket]);

    const [editConcertTicketFormData, setEditConcertTicketFormData] = useState({
        title: chosenConcertTicket.title
    });

    console.log("Displaying concertTickets on EditConcertTicketsForm" concertTickets)

    const handleEditConcertTicketChange = (e) => {
        setEditConcertTicketFormData({...editConcertTicketFormData, [e.target.name]: e.target.value})
    };

    const handleEdit = (e) => {
        e.preventDefault();

        const id = chosenConcertTicket.id;

        fetch(`/concert_tickets/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },

            body: JSON.stringify({ "title": editConcertTicketFormData.title }),

        })
        .then((response) => response.json())
        // NOTE: This is done to send up the edited concertTicket up to the parent component, 'App.js', accordingly:
        .then((editedConcertTicket) => onEditConcertTicket(editedConcertTicket));
    }

    const handleDelete = (e) => {
        e.preventDefault();
        const id = chosenConcertTicket.id;

        console.log("handleDelete function called in EditConcertTicketForm child component");
        console.log("id: ", id);

        fetch(`/concert_tickets/${id}`, {
            method: "DELETE",
        })
        .then((response) => {
            // NOTE: This checks the response, and then sends back the chosenConcertTicket up to the parent to be deleted by the handler function:
            console.log("response from deletion action: ", response);
            console.log("response.ok: ", response.ok);
            if (response.ok) {
                // onDeleteConcertTicket(chosenConcertTicket);
                console.log(chosenConcertTicket);

            }
        })
    }



    return (
        <div>
            <ChooseConcertTicketDropdowm 
                concertTickets={concertTickets} 
                onChooseConcertTicket={onChooseConcertTicket} 
            />
            <h2>Edit ConcertTicket</h2>
            <form>
                <label htmlFor="name">Title of ConcertTicket:</label>
                <br />
                <input onChange={handleEditConcertTicketChange} 
									type="text" 
									id="name" 
									name="title" 
									value={editConcertTicketFormData.title}/>
                <br />
      
                <br />
                <input onClick={handleEdit} type="submit" value="Submit Edit Changes" />
                <br />
                <input onClick={handleDelete} type="submit" value="Delete Concert Ticket" />
            </form>
        </div>
    )
}

export default EditConcertTicketForm;