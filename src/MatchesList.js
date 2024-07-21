import React from 'react';

const MatchesList = ({ matches }) => {
  return (
    <div>
      <h2>Matches</h2>
      <ul>
        {matches.map((match, index) => (
          <li key={index}>{match.mentor} - {match.mentee}</li>
        ))}
      </ul>
    </div>
  );
};

export default MatchesList;
