import React from 'react';
import * as XLSX from 'xlsx';

const UploadExcel = ({ setMatches }) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const mentorsSheet = workbook.Sheets[workbook.SheetNames[0]];
      const menteesSheet = workbook.Sheets[workbook.SheetNames[1]];

      const mentors = XLSX.utils.sheet_to_json(mentorsSheet);
      const mentees = XLSX.utils.sheet_to_json(menteesSheet);

      const matches = stableMatching(mentors, mentees);

      setMatches(matches);
    };

    reader.readAsArrayBuffer(file);
  };

  const stableMatching = (mentors, mentees) => {
    const mentorPreferences = {};
    const menteePreferences = {};
    const menteeFree = {};
    const mentorFree = {};
    const menteePartner = {};
    const mentorPartner = {};

    mentees.forEach(mentee => {
      menteePreferences[mentee.Name] = mentee['Preferred Mentors'].split(',').map(name => name.trim());
      menteeFree[mentee.Name] = true;
    });

    mentors.forEach(mentor => {
      mentorPreferences[mentor.Name] = mentor['Preferred Mentees'].split(',').map(name => name.trim());
      mentorFree[mentor.Name] = true;
    });

    const propose = (mentor) => {
      for (let mentee of mentorPreferences[mentor]) {
        if (menteeFree[mentee]) {
          menteePartner[mentee] = mentor;
          mentorPartner[mentor] = mentee;
          mentorFree[mentor] = false;
          menteeFree[mentee] = false;
          break;
        } else {
          const currentMentor = menteePartner[mentee];
          if (menteePreferences[mentee].indexOf(mentor) < menteePreferences[mentee].indexOf(currentMentor)) {
            menteePartner[mentee] = mentor;
            mentorPartner[mentor] = mentee;
            mentorFree[mentor] = false;
            mentorFree[currentMentor] = true;
            break;
          }
        }
      }
    };

    let freeMentors = Object.keys(mentorFree).filter(mentor => mentorFree[mentor]);
    while (freeMentors.length > 0) {
      const mentor = freeMentors[0];
      propose(mentor);
      freeMentors = Object.keys(mentorFree).filter(mentor => mentorFree[mentor]);
    }

    const matches = Object.keys(mentorPartner).map(mentor => ({
      mentor: mentor,
      mentee: mentorPartner[mentor]
    }));

    return matches;
  };

  return (
    <div>
      <h2>Upload Excel File</h2>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
};

export default UploadExcel;
