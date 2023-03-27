import React, { useState } from "react"; 
import ChooseConcertTixDropDowm from "../ConcertTix/ChooseConcertTixDropDowm";
import swal from "sweetalert";


function EditBandForm({ bandOptions, setbandOptions, bandId, setBandId, onChangeBandInfo, onEditBand, onDeleteBand, concertTickets, onChooseConcertTicket, chosenConcertTicket }) {
    const [editBandFormData, setEditBandFormData] = useState({
        name: ""

    });
    function handleChooseband(e) {
        let mapMatch = bandOptions.find(item => {
            return item.props.value === e.target.value
        });

        let bandMatch = mapMatch.props.value;

        setEditBandFormData({"name": bandMatch});
        

        let chosenConcertTicketBandsMatch = chosenConcertTicket.bands.find(band => band.name === bandMatch);

   
        let chosenBandIndex = chosenConcertTicket.bands.map(band => band.name).indexOf(bandMatch);

        let chosenBandId = chosenConcertTicketBandsMatch.id;
        onChangeBandInfo(chosenBandId, chosenBandIndex);
    }

    const handleEditbandChange = (e) => {
        setEditBandFormData({...editBandFormData, [e.target.name]: e.target.value})
    }

    const handleEdit = (e) => {
        e.preventDefault();

        const concertTicketId = chosenConcertTicket.id;

        fetch(`/concert_tickets/${concertTicketId}/bands/${bandId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({"name": editBandFormData["name"], "concert_ticket_id": concertTicketId}),
        })
        .then((response) => response.json())
        // .then((editedband) => onEditBand(editedband))
        .then((editedband) => {
            if (!editedband) {
                onEditBand(editedband)
                swal("Band Edited!")
            }
            else {
                swal("Can Only Edit Your Own Band")
            }
            });
    }

    const handleDelete = (e) => {
        e.preventDefault();
        const concertTicketId = chosenConcertTicket.id;

        fetch(`/concert_tickets/${concertTicketId}/bands/${bandId}`, {
            method: "DELETE",
        })
        .then((response) => {
            if (response.ok) {
                onDeleteBand(response, bandId);
            }
        })
        .then((response) => {
            if (response.ok) {
                onDeleteBand(response, bandId);
                swal("Band Deleted!");
            }
            else {
                swal("Can Only Delete Your Own Band")
            }
        });
    }

    return (
        <div>
            <ChooseConcertTixDropDowm 
                concertTickets={concertTickets} 
                onChooseConcertTicket={onChooseConcertTicket} 
            />
            <h2>Edit band</h2>
            <form>
                <label htmlFor="band_select">Choose a Band:</label>
                <br />
                <select name="band_select" id="band_select" onChange={handleChooseband}>
                    <option disabled selected value> -- Select a band -- </option>
                    { bandOptions }
                </select>
                <br />
                <br />
                <label htmlFor="name">Name of Band:</label>
                <br />
                <input onChange={handleEditbandChange} type="text" id="name" name="name" value={editBandFormData.name}/>
                <br />
                <br />
                <input onClick={handleEdit} type="submit" value="Edit" />
                <br />
                <input onClick={handleDelete} type="submit" value="Delete" />
            </form>
        </div>
    )
}

export default EditBandForm;