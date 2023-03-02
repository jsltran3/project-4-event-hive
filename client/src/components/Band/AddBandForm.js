import React, { useState } from "react";
import ChooseConcertTixDropDowm from "../ConcertTix/ChooseConcertTixDropDowm.js"

function AddBandForm({ onAddBand, concertTickets, onChooseConcertTicket, chosenConcertTicket }) {
    const [createBandFormData, setCreateBandFormData] = useState({
        name: "",
    });

    const handleCreateBandChange = (e) => {
        setCreateBandFormData({...createBandFormData, [e.target.name]: e.target.value})
    };

    const handleCreate = (e) => {
        e.preventDefault();
        const id = chosenConcertTicket.id;
        // NOTE: The 'Application Controller' will handle the '@current_user' so that it already knows the session["user_id"] to use in this scenario
        // Therefore, all you need to do is pass in a fetch request to the '/concertTickets' route:
        fetch(`/concertTickets/${id}/bands`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ "name": createBandFormData["band_name"], "concertTicket_id": id}),
        })
        .then((response) => response.json())
        // NOTE: This is done to send up the new concertTicket up to the parent component, 'App.js', accordingly:
        .then((newBand) => onAddBand(newBand));
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
            </form>
        </div>
    )

}

export default AddBandForm;