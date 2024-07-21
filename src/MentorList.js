import React from 'react';

const MentorList = ({ mentors }) => {
  return (
    <div>
      <h2>Mentors</h2>
      <ul>
        {mentors.map((mentor, index) => (
          <li key={index}>{mentor.name} - {mentor.expertise}</li>
        ))}
      </ul>
    </div>
  );
};

export default MentorList;
