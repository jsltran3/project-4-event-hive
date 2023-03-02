import React, { useEffect, useState } from "react";
import ChooseCookoutDropdown from "../cookout/ChooseCookoutDropdown";

function EditCookoutForm({ cookouts, onChooseCookout, onEditCookout, onDeleteCookout, chosenCookout }) {
    useEffect(() => {
        setEditCookoutFormData({
            name: chosenCookout.name,
            start_time: chosenCookout.start_time,
            end_time: chosenCookout.end_time
        })
    }, [chosenCookout]);

    const [editCookoutFormData, setEditCookoutFormData] = useState({
        name: chosenCookout.name,
        start_time: chosenCookout.start_time,
        end_time: chosenCookout.end_time
    });

    const handleEditCookoutChange = (e) => {
        setEditCookoutFormData({...editCookoutFormData, [e.target.name]: e.target.value})
    };

    const handleEdit = (e) => {
        e.preventDefault();

        const id = chosenCookout.id;

        fetch(`/cookouts/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ "name": editCookoutFormData["name"], "start_time": editCookoutFormData["start_time"], "end_time": editCookoutFormData["end_time"] }),
        })
        .then((response) => response.json())
        // NOTE: This is done to send up the edited cookout up to the parent component, 'App.js', accordingly:
        .then((editedCookout) => onEditCookout(editedCookout));
    }

    const handleDelete = (e) => {
        e.preventDefault();
        const id = chosenCookout.id;

        console.log("handleDelete function called in EditCookoutForm child component");
        console.log("id: ", id);

        fetch(`/cookouts/${id}`, {
            method: "DELETE",
        })
        .then((response) => {
            // NOTE: This checks the response, and then sends back the chosenCookout up to the parent to be deleted by the handler function:
            console.log("response from deletion action: ", response);
            console.log("response.ok: ", response.ok);
            if (response.ok) {
                onDeleteCookout(chosenCookout);
            }
        })
    }

    return (
        <div>
            <ChooseCookoutDropdown cookouts={cookouts} onChooseCookout={onChooseCookout} />
            <h2>Edit Cookout</h2>
            <form>
                <label htmlFor="name">Name of Cookout:</label>
                <br />
                <input onChange={handleEditCookoutChange} type="text" id="name" name="name" value={editCookoutFormData.name}/>
                <br />
                <label htmlFor="start_time">Start Time of Cookout:</label>
                <br />
                <input onChange={handleEditCookoutChange}  type="text" id="start_time" name="start_time" value={editCookoutFormData.start_time}/>
                <br />
                <label htmlFor="end_time">End Time of Cookout:</label>
                <br />
                <input onChange={handleEditCookoutChange} type="text" id="end_time" name="end_time" value={editCookoutFormData.end_time}/>
                <br />
                <br />
                <input onClick={handleEdit} type="submit" value="Edit" />
                <br />
                <input onClick={handleDelete} type="submit" value="Delete" />
            </form>
        </div>
    )
}

export default EditCookoutForm;