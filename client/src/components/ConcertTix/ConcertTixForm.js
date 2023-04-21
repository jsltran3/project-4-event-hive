import React, { useState } from "react";

function ConcertTixForm({ onAddConcertTicket }) {
  const [errors, setErrors] = useState([]);
  const [createConcertTicketFormData, setCreateConcertTicketFormData] =
    useState({
      title: "",
    });

  const handleCreateConcertTicketChange = (e) => {
    setCreateConcertTicketFormData({
      ...createConcertTicketFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateConcertTicketFormSubmit = (e) => {
    e.preventDefault();
    // NOTE: The 'Application Controller' will handle the '@current_user' so that it already knows the session["user_id"] to use in this scenario
    // Therefore, all you need to do is pass in a fetch request to the '/concertTickets' route:
    fetch("/concert_tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ title: createConcertTicketFormData.title }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((r) => {
          onAddConcertTicket(r);
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  };

  return (
    <div>
      <h2>Add New ConcertTicket</h2>
      <form onSubmit={handleCreateConcertTicketFormSubmit}>
        <label htmlFor="title">Title of ConcertTicket:</label>
        <br />
        <input
          onChange={handleCreateConcertTicketChange}
          type="text"
          id="name"
          name="title"
        />
        <br />
        <input type="submit" />
        {errors.length > 0 && (
          <ul className="errors">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
      </form>
      <br />
    </div>
  );
}

export default ConcertTixForm;
