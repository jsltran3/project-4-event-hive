import React, { useEffect, useState } from "react";
import ChooseConcertTicketDropdowm from "./ChooseConcertTixDropDowm.js"
// import swal from "sweetalert";


function EditConcertTicketForm({ concertTickets, onChooseConcertTicket, onEditConcertTicket, onDeleteConcertTicket, chosenConcertTicket }) {
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        setEditConcertTicketFormData({
            title: chosenConcertTicket.title

        })
    }, [chosenConcertTicket]);

    const [editConcertTicketFormData, setEditConcertTicketFormData] = useState({
        title: chosenConcertTicket.title
    });


    const handleEditConcertTicketChange = (e) => {
        setEditConcertTicketFormData({...editConcertTicketFormData, [e.target.name]: e.target.value})
    };

    const handleEdit = (e) => {
        e.preventDefault();

        const id = chosenConcertTicket.id;

        fetch(`/concert_tickets/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },

            body: JSON.stringify({ "title": editConcertTicketFormData.title }),

        })
        // .then((response) => response.json())
        // .then((editedConcertTicket) => {
		// 			if (!editedConcertTicket.errors) {
		// 				onEditConcertTicket(editedConcertTicket)
		// 				swal("Concert Ticket Edited!")
		// 			}
		// 			else {
		// 				swal("Can only edit your own ticket")
		// 			}
		// 			});
        .then((r) => {
            if (r.ok) {
                r.json().then((r) => {
                    onEditConcertTicket(r)
                });
            } else {
                // r.json().then((err) => console.log("this is the error", err.errors.title))
                r.json().then((err) => setErrors(err.errors.title))
            }
        })
		
    }

    const handleDelete = (e) => {
        e.preventDefault();
        const id = chosenConcertTicket.id;

        console.log("handleDelete function called in EditConcertTicketForm child component");
        console.log("id: ", id);

        fetch(`/concert_tickets/${id}`, {
            method: "DELETE",
        })
        // .then((response) => {
        //     console.log("response from deletion action: ", response);
        //     if (response) {
        //         onDeleteConcertTicket(chosenConcertTicket);
        //         swal("Concert Ticket Deleted!");
        //     }
        //     else {
        //         swal("Can only delete your own ticket")
        //     }
        // });
        .then((r) => {
            if (r.ok) {
                r.json().then((r) => { 
                    onDeleteConcertTicket(r)
                });
            } else {
                r.json().then((err) => console.log(err.errors))
            }
    })
    }




    return (
        <div>
            <ChooseConcertTicketDropdowm 
                concertTickets={concertTickets} 
                onChooseConcertTicket={onChooseConcertTicket} 
            />
            <h2>Edit ConcertTicket</h2>
            <form>
                <label htmlFor="name">Title of ConcertTicket:</label>
                <br />
                <input onChange={handleEditConcertTicketChange} 
									type="text" 
									id="name" 
									name="title" 
									value={editConcertTicketFormData.title}/>
                <br />
      
                {/* <br /> */}
                <input onClick={handleEdit} type="submit" value="Submit Edit Changes" />
                {errors.length > 0 && (
                    <ul className="errors"> {errors.map((error) => (
                    <li key={error}>{error}</li>
                    ))}
                    </ul>
                    )
                }
                <br />
                <input onClick={handleDelete} type="submit" value="Delete Concert Ticket" />
                {errors.length > 0 && (
                    <ul className="errors"> {errors.map((error) => (
                    <li key={error}>{error}</li>
                    ))}
                    </ul>
                    )
                }
            </form>
        </div>
    )
}

export default EditConcertTicketForm;