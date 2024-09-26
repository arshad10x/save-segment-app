// src/components/PopupForm.js
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";

// Predefined schema options
const schemas = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

const PopupForm = ({ open, onClose, onSave }) => {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([""]); // Start with one empty schema

  // Handle change in schema selection
  const handleSchemaChange = (index, value) => {
    const newSchemas = [...selectedSchemas];
    newSchemas[index] = value; // Update the selected schema for this dropdown
    setSelectedSchemas(newSchemas);
  };

  // Add a new schema dropdown
  const addNewSchema = () => {
    setSelectedSchemas([...selectedSchemas, ""]); // Add a new empty value for the new dropdown
  };

  // Handle saving the segment
  const handleSaveSegment = () => {
    const schemaData = selectedSchemas
      .filter((schema) => schema) // Filter out empty selections
      .map((schema) => {
        const selectedOption = schemas.find((s) => s.value === schema);
        return selectedOption
          ? { [selectedOption.value]: selectedOption.label }
          : null;
      })
      .filter(Boolean); // Remove null entries

    const segmentData = {
      segment_name: segmentName,
      schema: schemaData,
    };

    onSave(segmentData); // Call the onSave function
    resetForm(); // Reset the form after saving
  };

  // Reset the form
  const resetForm = () => {
    setSegmentName("");
    setSelectedSchemas([""]); // Reset selected schemas
    onClose(); // Close the popup
  };

  return (
    <Dialog open={open} onClose={resetForm}>
      <DialogTitle>Save Segment</DialogTitle>
      <DialogContent>
        <TextField
          label="Segment Name"
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
          fullWidth
          margin="normal"
        />
        {selectedSchemas.map((schema, index) => (
          <FormControl fullWidth margin="normal" key={index}>
            <InputLabel>Add Schema to Segment</InputLabel>
            <Select
              value={schema}
              onChange={(e) => handleSchemaChange(index, e.target.value)} // Update the selected value
            >
              <MenuItem value="">Select a schema</MenuItem>
              {schemas
                .filter(
                  (s) =>
                    !selectedSchemas.includes(s.value) || s.value === schema
                ) // Ensure already selected values remain available
                .map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        ))}
        <Button
          onClick={addNewSchema}
          variant="outlined"
          style={{ marginTop: "10px" }}
        >
          + Add new schema
        </Button>
        <Button
          onClick={handleSaveSegment} // Call the handleSaveSegment on button click
          variant="contained"
          color="primary"
          style={{ marginTop: "10px", marginLeft: "10px" }}
        >
          Save the segment
        </Button>

        {/* Display selected schemas */}
        <Typography variant="h6" style={{ marginTop: "20px" }}>
          Selected Schemas:
        </Typography>
        {selectedSchemas.map((schema, index) => {
          const selectedOption = schemas.find((s) => s.value === schema);
          return selectedOption ? (
            <Typography key={index} variant="body1">
              {selectedOption.label}
            </Typography>
          ) : null;
        })}
      </DialogContent>
    </Dialog>
  );
};

export default PopupForm;
