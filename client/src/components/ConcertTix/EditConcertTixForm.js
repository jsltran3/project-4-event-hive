import React, { useEffect, useState } from "react";
import ChooseConcertTicketDropdown from "./ChooseConcertTixDropDowm.js"

function EditConcertTicketForm({ concertTickets, onChooseConcertTicket, onEditConcertTicket, onDeleteConcertTicket, chosenConcertTicket }) {
    useEffect(() => {
        setEditConcertTicketFormData({
            title: chosenConcertTicket.title

        })
    }, [chosenConcertTicket]);

    const [editConcertTicketFormData, setEditConcertTicketFormData] = useState({
        title: chosenConcertTicket.title
        // name: chosenConcertTicket.name,
    });

    const handleEditConcertTicketChange = (e) => {
        setEditConcertTicketFormData({...editConcertTicketFormData, [e.target.name]: e.target.value})
    };

    const handleEdit = (e) => {
        e.preventDefault();

        const id = chosenConcertTicket.id;

        fetch(`/concerttickets/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            // body: JSON.stringify({ "name": editConcertTicketFormData["name"], "start_time": editConcertTicketFormData["start_time"], "end_time": editConcertTicketFormData["end_time"] }),
            // body: JSON.stringify({ "title": editConcertTicketFormData["title"] }),
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

        fetch(`/concerttickets/${id}`, {
            method: "DELETE",
        })
        .then((response) => {
            // NOTE: This checks the response, and then sends back the chosenConcertTicket up to the parent to be deleted by the handler function:
            console.log("response from deletion action: ", response);
            console.log("response.ok: ", response.ok);
            if (response.ok) {
                onDeleteConcertTicket(chosenConcertTicket);
            }
        })
    }

    return (
        <div>
            <ChooseConcertTicketDropdown concertTickets={concertTickets} onChooseConcertTicket={onChooseConcertTicket} />
            <h2>Edit ConcertTicket</h2>
            <form>
                <label htmlFor="title">Title of ConcertTicket:</label>
                <br />
                <input onChange={handleEditConcertTicketChange} 
									type="text" 
									id="name" 
									name="title" 
									value={editConcertTicketFormData.title}/>
                <br />
                {/* <label htmlFor="start_time">Start Time of ConcertTicket:</label>
                <br />
                <input 
									onChange={handleEditConcertTicketChange}  
									type="text" 
									id="start_time" 
									name="start_time" 
									value={editConcertTicketFormData.start_time}/>
                <br />
                <label htmlFor="end_time">End Time of ConcertTicket:</label>
                <br />
                <input 
									onChange={handleEditConcertTicketChange} 
									type="text" 
									id="end_time" 
									name="end_time" 
									value={editConcertTicketFormData.end_time}/>
                <br /> */}
                <br />
                <input onClick={handleEdit} type="submit" value="Edit" />
                <br />
                <input onClick={handleDelete} type="submit" value="Delete" />
            </form>
        </div>
    )
}

export default EditConcertTicketForm;