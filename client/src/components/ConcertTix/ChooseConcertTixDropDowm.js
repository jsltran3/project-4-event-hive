import React from "react";

function ChooseConcertTixDropDowm({ concertTickets, onChooseConcertTicket}) {
    console.log("Concert Tickets in ChooseConcertTicketForm: ", concertTickets);


    let concertTicketOptionsArray = concertTickets.map(concertTicket => {
        return (
            <option key={concertTicket.id} value={concertTicket.title}>{concertTicket.title}</option>
        )
    });


    return (
        <>
            <h2>Choose Concert Ticket: </h2>
            <form>
                <label htmlFor="choose_concertticket">Choose a Concert Ticket:</label>
                <br />
                <select 
                    name="choose_concertticket" 
                    id="choose_concertticket" 
                    onChange={onChooseConcertTicket}>
                    <option disabled selected value> -- Select a concertTicket -- </option>
                    { concertTicketOptionsArray }
                </select>
                <br />
            </form>
        </>
    )
}

export default ChooseConcertTixDropDowm;