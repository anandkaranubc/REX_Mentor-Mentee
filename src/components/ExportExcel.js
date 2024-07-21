import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ExportExcel = ({ matches }) => {
  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(matches);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Matches');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    const s2ab = (s) => {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xFF;
      }
      return buf;
    };

    saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'matches.xlsx');
  };

  return (
    <button onClick={handleExport}>Export Matches to Excel</button>
  );
};

export default ExportExcel;
