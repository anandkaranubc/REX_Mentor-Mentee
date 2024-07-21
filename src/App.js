import React, { useState } from 'react';
import UploadExcel from './UploadExcel';
import MatchesList from './MatchesList';
import ExportExcel from './ExportExcel';
import './styles.css';
import sampleFile from './mentor_mentee_preferences.xlsx'; // Make sure to place the sample file in the public folder

const App = () => {
  const [matches, setMatches] = useState([]);

  return (
    <div className="container">
      <h1>Mentor-Mentee Matching</h1>
      <div className="intro">
        <p>Welcome to the Mentor-Mentee Matching platform. To get started, please upload an Excel file containing the details of mentors and mentees.</p>
        <p>Your Excel file should have two sheets named "Mentors" and "Mentees" with the following format:</p>
        <h3>Mentors Sheet</h3>
        <ul>
          <li><strong>Name</strong>: The name of the mentor.</li>
          <li><strong>Preferred Mentees</strong>: Comma-separated list of preferred mentees.</li>
        </ul>
        <h3>Mentees Sheet</h3>
        <ul>
          <li><strong>Name</strong>: The name of the mentee.</li>
          <li><strong>Preferred Mentors</strong>: Comma-separated list of preferred mentors.</li>
        </ul>
        <p>You can download a sample Excel file <a href={sampleFile} download>here</a>.</p>
      </div>
      <UploadExcel setMatches={setMatches} />
      {matches.length > 0 && (
        <>
          <MatchesList matches={matches} />
          <ExportExcel matches={matches} />
        </>
      )}
    </div>
  );
};

export default App;
