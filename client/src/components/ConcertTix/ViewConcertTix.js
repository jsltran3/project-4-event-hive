import React, { useEffect } from "react"

function ViewConcertTix({ cookouts, onFetchCookouts }) {
    // NOTE:
    // Make another fetch request just in case the the user decides to click on 'ViewCookouts' first before entering anything
    // to avoid a weird workflow issue
    useEffect(() => {
        fetch("/cookouts", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        })
        .then((response) => response.json())
        .then((data) => {
            onFetchCookouts(data);
        });
    }, []);
    console.log("cookouts from ViewCookouts child component: ", cookouts);
    let cookoutResults = cookouts.map((cookout) => {
        let cookoutFoods = cookout.foods.map((food) => {
            return (
                <li key={food.id}>{food.name}</li>
            )
        })

        let usersArray = [];

        cookout.users.map((user) => {
            usersArray.push(user);
        })

        // Remove duplicate users since each 'food' is tied to a user:
        // Used this StackOverflow post as a reference:
        // https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
        let uniqueUsers = [...new Set(usersArray.map((user) => user.username ))]  ;
        // console.log("uniqueUsers: ", uniqueUsers);

        // Regardless of this post, it's still worth it to use .indexOf() in this scenario:
        // https://stackoverflow.com/questions/59517962/react-using-index-as-key-for-items-in-the-list
        let cookoutUsers = uniqueUsers.map((user) => {
            return (
                <li key={uniqueUsers.indexOf(user)}>{user}</li>
            )
        })

        return (
            <>
                <ul>
                    <li>{cookout.name}</li>
                    <ul>
                        <li>Start Time</li>
                        <ul>
                            {cookout.start_time}
                        </ul>
                        <li>End Time: </li>
                        <ul>
                            {cookout.end_time}
                        </ul>
                        <li>Foods: </li>
                        <ul>
                            {cookoutFoods}
                        </ul>
                        <li>Users: </li>
                        <ul>
                            {cookoutUsers}
                        </ul>
                    </ul>
                </ul>
            </>
        )
    });

    return (
        <>
            <h1>View All Cookouts</h1>
            { cookoutResults }
        </>
    )

}

export default ViewConcertTix;