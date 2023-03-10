import React, { useState } from "react"; 
import ChooseConcertTixDropDowm from "../ConcertTix/ChooseConcertTixDropDowm";

function EditBandForm({ bandOptions, setbandOptions, bandId, setBandId, onChangeBandInfo, onEditBand, onDeleteBand, conertTickets, onChooseConcertTicket, chosenConcertTicket }) {
    const [editBandFormData, setEditBandFormData] = useState({
        // band_name: ""
        name: ""

    });

    function handleChooseband(e) {
        let mapMatch = bandOptions.find(item => {
            return item.props.value === e.target.value
        });

        let bandMatch = mapMatch.props.value;

        // setEditBandFormData({"band_name": bandMatch});
        setEditBandFormData({"name": bandMatch});
        

        let chosenConcertTicketBandsMatch = chosenConcertTicket.bands.find(band => band.name === bandMatch);

        // From this StackOverflow example:
        // https://stackoverflow.com/questions/8668174/indexof-method-in-an-object-array
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

        // From 'rails routes' within 'rails c' console:
        //  PATCH  /conertt_tickets/:concertticket_id/bands/:id(.:format)                                                         bands#update  
        fetch(`/conert_tickets/${concertTicketId}/bands/${bandId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({"name": editBandFormData["name"], "concert_ticket_id": concertTicketId}),
        })
        .then((response) => response.json())
        .then((editedband) => onEditBand(editedband))
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
    }

    return (
        <div>
            <ChooseConcertTixDropDowm 
                conertTickets={conertTickets} 
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