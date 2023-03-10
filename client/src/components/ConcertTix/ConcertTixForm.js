import React, { useState } from "react";

function ConcertTixForm({ onAddConcertTicket }) {
    const [createConcertTicketFormData, setCreateConcertTicketFormData] = useState({
        title: ""
        // start_time: "",
        // end_time: ""
    });

    const handleCreateConcertTicketChange = (e) => {
        setCreateConcertTicketFormData({...createConcertTicketFormData, [e.target.name]: e.target.value})
    };

    const handleCreateConcertTicketFormSubmit = (e) => {
        e.preventDefault();
        // NOTE: The 'Application Controller' will handle the '@current_user' so that it already knows the session["user_id"] to use in this scenario
        // Therefore, all you need to do is pass in a fetch request to the '/concertTickets' route:
        fetch("/concert_tickets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ "title": createConcertTicketFormData.title }),
            // body: JSON.stringify( title : createConcertTicketFormData.title ),

            // body: JSON.stringify({ "title": createConcertTicketFormData["title"], "start_time": createConcertTicketFormData["start_time"], "end_time": createConcertTicketFormData["end_time"] }),
        })
        .then((response) => response.json())
        // NOTE: This is done to send up the new concertTicket up to the parent component, 'App.js', accordingly:
        .then((newConcertTicket) => onAddConcertTicket(newConcertTicket));
            // .then((newConcertTicket) => console.log(newConcertTicket));

    }

    return (
        <div>
            <h2>Add New ConcertTicket</h2>
            <form onSubmit={handleCreateConcertTicketFormSubmit}>
                <label htmlFor="title">Title of ConcertTicket:</label>
                <br />
                <input 
                    onChange={handleCreateConcertTicketChange} 
                    type="text" 
                    id="name" 
                    name="title"/>
                <br />

                <input type="submit"/>
            </form>
        </div>
    )

}

export default ConcertTixForm;