import React, { useState } from "react";

function ConcertForm ({ handleUserSubmit }){
	const [newUser, setNewUser] = useState({name: ''});

	const handleChange = (e) => {
    setNewUser({...newUser, [e.target.name]: e.target.value})
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:9292/chirper_profile/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then(r => r.json())
    .then(user => {
      handleUserSubmit(user);
      setNewUser({
        name: ''
      })
    })
    
  }
  
  return(
    <div>
 	   <h2>Add new Chirper User</h2>
      <form className='Form' onSubmit={handleSubmit}>
        <input type='text' placeholder='User Name' name='name' value={newUser.name} onChange={handleChange} required/>
        <button className='Form-button'>Create User</button>
      </form>
    </div>
  )

}

export default ConcertForm;