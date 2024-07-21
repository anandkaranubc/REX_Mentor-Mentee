import React, { useState } from 'react';

const AddMentee = ({ addMentee }) => {
  const [name, setName] = useState('');
  const [interest, setInterest] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addMentee({ name, interest });
    setName('');
    setInterest('');
  };

  return (
    <div>
      <h2>Add Mentee</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Interest" 
          value={interest} 
          onChange={(e) => setInterest(e.target.value)} 
        />
        <button type="submit">Add Mentee</button>
      </form>
    </div>
  );
};

export default AddMentee;
