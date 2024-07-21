import React, { useState } from 'react';

const AddMentor = ({ addMentor }) => {
  const [name, setName] = useState('');
  const [expertise, setExpertise] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addMentor({ name, expertise });
    setName('');
    setExpertise('');
  };

  return (
    <div>
      <h2>Add Mentor</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Expertise" 
          value={expertise} 
          onChange={(e) => setExpertise(e.target.value)} 
        />
        <button type="submit">Add Mentor</button>
      </form>
    </div>
  );
};

export default AddMentor;
