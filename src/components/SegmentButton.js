import React from 'react';
import { Button } from '@mui/material';

const SegmentButton = ({ onClick }) => {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      Save segment
    </Button>
  );
};

export default SegmentButton;
