import React, { useEffect } from "react"

function ViewConcertTix({ concertTickets, onFetchConcertTickets }) {
    // NOTE:
    // Make another fetch request just in case the the user decides to click on 'ViewConcertTickets' first before entering anything
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

        // Remove duplicate users since each 'band' is tied to a user:
        // Used this StackOverflow post as a reference:
        // https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
        let uniqueUsers = [...new Set(usersArray.map((user) => user.username ))]  ;
        // console.log("uniqueUsers: ", uniqueUsers);

        // Regardless of this post, it's still worth it to use .indexOf() in this scenario:
        // https://stackoverflow.com/questions/59517962/react-using-index-as-key-for-items-in-the-list
        let concertTicketUsers = uniqueUsers.map((user) => {
            return (
                <li key={uniqueUsers.indexOf(user)}>{user}</li>
            )
        })

        return (
            <>
                <ul>
                    <li>{concertTicket.name}</li>
                    <ul>
                        <li>Start Time</li>
                        <ul>
                            {concertTicket.start_time}
                        </ul>
                        <li>End Time: </li>
                        <ul>
                            {concertTicket.end_time}
                        </ul>
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