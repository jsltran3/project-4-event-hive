import React, { useState, useEffect } from "react";
import AddBandForm from "./AddBandForm.js";
import EditBandForm from "./EditBandsForm.js";

function Band({ onAddBand, bandOptions, setBandOptions, bandId, setBandId, onChangeBandInfo, onEditBand, onDeleteBand, concertTickets, onChooseConcertTicket, chosenConcertTicket, onFetchConcertTickets }) {
    // NOTE:
    // Make another fetch request just in case the the user decides to click on 'Bands' first before entering anything
    // to avoid a weird workflow issue
    useEffect(() => {
        fetch("/concertTickets", {
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

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

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
            <button onClick={toggleEditBands}>Edit Bands</button>
            <br />
            {   
                showAdd &&
                <AddBandForm 
                    onAddBand={onAddBand} 
                    concertTickets={concertTickets} onChooseConcertTicket={onChooseConcertTicket} chosenConcertTicket={chosenConcertTicket}
                />
            }
            {   
                showAdd && showEdit &&
                <hr/>
            }
            {
                showEdit&&
                <EditBandForm 
                    bandOptions={bandOptions} setBandOptions={setBandOptions} bandId={bandId} setBandId={setBandId} onChangeBandInfo={onChangeBandInfo}
                    onEditBand={onEditBand} onDeleteBand={onDeleteBand} 
                    concertTickets={concertTickets} onChooseConcertTicket={onChooseConcertTicket} chosenConcertTicket={chosenConcertTicket}
                />
            }
        </div>
    )
}

export default Band;