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
        r.json().then((err) => setEditErrors(err.errors));
      }
    });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const id = chosenConcertTicket.id;

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
