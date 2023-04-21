import React, { useState, useMemo } from "react";
import ChooseConcertTixDropDowm from "../ConcertTix/ChooseConcertTixDropDowm.js";
// import swal from "sweetalert";

function AddBandForm({
  onAddBand,
  concertTickets,
  onChooseConcertTicket,
  chosenConcertTicket,
}) {
  const [errors, setErrors] = useState([]);
  const [createBandFormData, setCreateBandFormData] = useState({
    name: "",
  });

  const canAddBand = useMemo(() => {
    return chosenConcertTicket.id !== undefined;
  }, [chosenConcertTicket]);

  const handleCreateBandChange = (e) => {
    setCreateBandFormData({
      ...createBandFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();

    // setErrors([]);

    const id = chosenConcertTicket.id;

    fetch(`/concert_tickets/${id}/bands`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: createBandFormData["band_name"],
        concertTicket_id: id,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((r) => {
          onAddBand(r);
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
        // r.json().then((err) => console.log(err.errors));
      }
    });
  };

  return (
    <div>
      <ChooseConcertTixDropDowm
        concertTickets={concertTickets}
        onChooseConcertTicket={onChooseConcertTicket}
      />
      <h2>Add New Band</h2>
      <form>
        <label htmlFor="name">Name of Band:</label>
        <br />
        <input
          onChange={handleCreateBandChange}
          type="text"
          id="name"
          name="band_name"
        />
        <br />
        <input disabled={!canAddBand} onClick={handleCreate} type="submit" />
        {errors.length > 0 && (
          <ul className="errors">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
}

export default AddBandForm;
