import React, { useEffect, useState, useMemo } from "react";
import ChooseConcertTicketDropdowm from "./ChooseConcertTixDropDowm.js";

function EditConcertTicketForm({
  concertTickets,
  onChooseConcertTicket,
  onEditConcertTicket,
  onDeleteConcertTicket,
  chosenConcertTicket,
}) {
  const [editErrors, setEditErrors] = useState([]);
  const [deleteErrors, setDeleteErrors] = useState([]);

  useEffect(() => {
    setEditConcertTicketFormData({
      title: chosenConcertTicket.title,
    });
  }, [chosenConcertTicket]);

  const canEditTicket = useMemo(() => {
    return chosenConcertTicket.id !== undefined;
  }, [chosenConcertTicket]);

  const [editConcertTicketFormData, setEditConcertTicketFormData] = useState({
    title: chosenConcertTicket.title,
  });

  const handleEditConcertTicketChange = (e) => {
    setEditConcertTicketFormData({
      ...editConcertTicketFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();

    const id = chosenConcertTicket.id;

    fetch(`/concert_tickets/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify({ title: editConcertTicketFormData.title }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((r) => {
          onEditConcertTicket(r);
        });
      } else {
        console.log("I'm in the else branch");
        //   r.json().then((err) => console.log("this is the error", err));
        //we're doing this to see what the shape of the errors are --in this case, it's a string
        //   r.json().then((err) => setErrors([err]));
        r.json().then((err) => setEditErrors(err.errors));
      }
    });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const id = chosenConcertTicket.id;

    // console.log("handleDelete function called in EditConcertTicketForm child component");
    // console.log("id: ", id);

    fetch(`/concert_tickets/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        r.json().then((r) => {
          onDeleteConcertTicket(r);
        });
      } else {
        r.json().then((err) => setDeleteErrors(err.errors));
      }
    });
  };

  return (
    <div>
      <ChooseConcertTicketDropdowm
        concertTickets={concertTickets}
        onChooseConcertTicket={onChooseConcertTicket}
      />
      {canEditTicket && (
        <div>
          <h2>Edit ConcertTicket</h2>
          <form>
            <label htmlFor="name">Title of ConcertTicket:</label>
            <br />
            <input
              onChange={handleEditConcertTicketChange}
              type="text"
              id="name"
              name="title"
              value={editConcertTicketFormData.title}
            />
            <br />

            <input
              // the disabled property this input should be disabled when the concertticket is undefined or user hasn't selected dropdown from above
              //html property for inputs
              disabled={!canEditTicket}
              onClick={handleEdit}
              type="submit"
              value="Submit Edit Changes"
            />
            {editErrors.length > 0 && (
              <ul className="errors">
                {editErrors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
            )}
            <br />
            <input
              disabled={!canEditTicket}
              onClick={handleDelete}
              type="submit"
              value="Delete Concert Ticket"
            />
            {deleteErrors.length > 0 && (
              <ul className="errors">
                {deleteErrors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

export default EditConcertTicketForm;
