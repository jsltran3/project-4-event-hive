import React, { useState, useEffect } from "react";
import AddBandForm from "./AddBandForm.js";
import EditBandForm from "./EditBandsForm.js";

function Band({ onAddBand, bandOptions, setBandOptions, bandId, setBandId, onChangeBandInfo, onEditBand, onDeleteBand, concertTickets, onChooseConcertTicket, chosenConcertTicket, onFetchConcertTickets }) {

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    console.log("Concert Tickets in Band Main component: ", concertTickets);

    useEffect(() => {
        fetch("/concert_tickets", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        })
        .then((response) => response.json())
        .then((data) => {
            onFetchConcertTickets(data);
        });
    }, []);

    function toggleAddBands() {
        setShowAdd(!showAdd);
    }

    function toggleEditBands() {
        setShowEdit(!showEdit);
    }
    return (
        <div>
            <h1>Bands</h1>
            <button onClick={toggleAddBands}>Add Bands</button>
            <br />
            <br />
            <button onClick={toggleEditBands}>Edit Band Name</button>
            <br />
            {   
                showAdd &&
                <AddBandForm 
                    onAddBand={onAddBand} 
                    concertTickets={concertTickets} 
                    onChooseConcertTicket={onChooseConcertTicket} 
                    chosenConcertTicket={chosenConcertTicket}
                />
            }
            {   
                showAdd && showEdit &&
                <hr/>
            }
            {
                showEdit &&
                <EditBandForm 
                    bandOptions={bandOptions} 
                    setBandOptions={setBandOptions} 
                    bandId={bandId} setBandId={setBandId} 
                    onChangeBandInfo={onChangeBandInfo}
                    onEditBand={onEditBand} 
                    onDeleteBand={onDeleteBand} 
                    concertTickets={concertTickets} 
                    onChooseConcertTicket={onChooseConcertTicket} 
                    chosenConcertTicket={chosenConcertTicket}
                />
            }
        </div>
    )
}

export default Band;