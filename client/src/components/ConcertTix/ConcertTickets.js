import React, { useState, useEffect } from "react";
import ConcertTixForm from "./ConcertTixForm";
import EditConcertTixForm from "./EditConcertTixForm.js"

function ConcertTickets({ concertTickets, onFetchConcertTickets, onAddConcertTicket, onEditConcertTicket, onDeleteConcertTicket, onChooseConcertTicket, chosenConcertTicket}) {
    // NOTE:
    // I placed the fetch for '/concertTickets' on the 'ConcertTicket' level as it was causing too many issues in the parent App component because of authentication:
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

    function toggleAddConcertTickets() {
        setShowAdd(!showAdd);
    }

    function toggleEditConcertTickets() {
        setShowEdit(!showEdit);
    }

    return (
        <div>
            <h1>ConcertTickets</h1>
            <button onClick={toggleAddConcertTickets}>Add ConcertTickets</button>
            <br />
            <br />
            <button onClick={toggleEditConcertTickets}>Edit ConcertTickets</button>
            <br />
            { 
                showAdd  &&
                <ConcertTixForm 
                    onAddConcertTicket={onAddConcertTicket} 
                />
            }
            {   
                showAdd && showEdit &&
                <hr/>
            }
            {   
                showEdit &&
                <EditConcertTixForm 
                    onEditConcertTicket={onEditConcertTicket} 
										onDeleteConcertTicket={onDeleteConcertTicket} 
                    concertTickets={concertTickets} 
										onChooseConcertTicket={onChooseConcertTicket} 
										chosenConcertTicket={chosenConcertTicket} 
                />
            }
        </div>
    )
}

export default ConcertTickets;