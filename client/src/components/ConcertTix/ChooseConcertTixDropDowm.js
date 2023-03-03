import React from "react";

function ChooseConcertTixDropDowm({ concertTickets, onChooseConcertTicket}) {
    console.log("Concert Tickets in ChooseConcertTicketForm: ", concertTickets);
    // let concertTicketOptionsArray = [];

    // if (concertTickets) {
    //     let concertTicketOptionsArray = concertTickets.map(concertTicket => {
    //         return (
    //             <option key={concertTicket.id} value={concertTicket.name}>{concertTicket.name}</option>
    //         )
    //     });
    // }

    let concertTicketOptionsArray = concertTickets.map(concertTicket => {
        return (
            <option key={concertTicket.id} value={concertTicket.name}>{concertTicket.name}</option>
        )
    });


    return (
        <>
            <h2>Choose Concert Ticket: </h2>
            <form>
                <label htmlFor="choose_concertTicket">Choose a Concert Ticket:</label>
                <br />
                <select name="choose_concertTicket" id="choose_concertTicket" onChange={onChooseConcertTicket}>
                    <option disabled selected value> -- Select a concertTicket -- </option>
                    { concertTicketOptionsArray }
                </select>
                <br />
            </form>
        </>
    )
}

export default ChooseConcertTixDropDowm;