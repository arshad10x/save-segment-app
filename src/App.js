// src/App.js
import React, { useState } from 'react';
import { Button } from '@mui/material';
import PopupForm from './components/PopupForm';

const App = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (segmentData) => {
    console.log('Segment Data:', segmentData); // Logs the segment data
   // wekhook site not working 
    handleClose(); // Close the popup after saving
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Save Segment
      </Button>
      <PopupForm open={open} onClose={handleClose} onSave={handleSave} />
    </div>
  );
};

export default App;
