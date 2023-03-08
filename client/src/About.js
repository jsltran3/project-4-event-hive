import React from "react";

function About({ user }) {
    
    return (
        <div>
            <h2>About Page</h2>
            <p>
                This app is a Full Stack web application made with React and Ruby On Rails that allows a user gather and share memories of past concerts. 
            </p>
            <h2>Current Functions</h2>
            <ul>
                <li>
                    Login page where a user can create an account, and login to the site
                </li>
                <li>
                    The ability to create a cookout with a start and end time
                </li>
                <li>
                    The ability to add new bands to an existing Concert memory/ticket as well as edit or delete the bands
                </li>
                <li>
                    The ability to create, edit, and delete a band
                </li>
                <li>
                    The ability to display a summary page to view all users' past concerts
                </li>
            </ul>
   
        </div>
    )
}

export default About;