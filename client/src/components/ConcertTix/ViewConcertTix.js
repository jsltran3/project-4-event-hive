import React, { useEffect } from "react"

function ViewConcertTix({ concertTickets, onFetchConcertTickets }) {

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
    
    console.log("concertTickets from ViewConcertTickets child component: ", concertTickets);
    let concertTicketResults = concertTickets.map((concertTicket) => {
        let concertTicketBands = concertTicket.bands.map((band) => {
            return (
                <li key={band.id}>{band.name}</li>
            )
        })

        let usersArray = [];

        concertTicket.users.map((user) => {
            usersArray.push(user);
        })

        let uniqueUsers = [...new Set(usersArray.map((user) => user.username ))]  ;

        let concertTicketUsers = uniqueUsers.map((user) => {
            return (
                <li key={uniqueUsers.indexOf(user)}>{user}</li>
            )
        })

        return (
            <>
                <ul>
                    <li>{concertTicket.title}</li>
                    <ul>
                        <li>Bands: </li>
                        <ul>
                            {concertTicketBands}
                        </ul>
                        <li>Users: </li>
                        <ul>
                            {concertTicketUsers}
                        </ul>
                    </ul>
                </ul>
            </>
        )
    });

    return (
        <>
            <h1>View All ConcertTickets</h1>
            { concertTicketResults }
        </>
    )

}

export default ViewConcertTix;