import React from 'react';

const MenteeList = ({ mentees }) => {
  return (
    <div>
      <h2>Mentees</h2>
      <ul>
        {mentees.map((mentee, index) => (
          <li key={index}>{mentee.name} - {mentee.interest}</li>
        ))}
      </ul>
    </div>
  );
};

export default MenteeList;
