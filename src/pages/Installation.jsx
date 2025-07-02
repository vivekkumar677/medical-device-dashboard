import {
  Box, Button, Checkbox, FormControlLabel, FormGroup, Grid,
  Paper, TextField, Typography
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addInstallation } from "../redux/slices/installationsSlices";
import { useLocalStorage } from "../hooks/useLocalStorage";
import QRScanner from "../components/QRScanner";

const checklistItems = ['Unboxed device', 'Power test', 'Connectivity check', 'Initial setup'];

const Installation = () => {
  const dispatch = useDispatch();
  const [installations, setInstallations] = useLocalStorage('installations', []);
  const [form, setForm] = useState({
    deviceId: '',
    facility: '',
    trainer: '',
    checklist: [],
    feedback: '',
    photo: null,
    status: 'Pending',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = { ...form, id: Date.now() };
    dispatch(addInstallation(newEntry));
    setInstallations([...installations, newEntry]);
    alert('Installation logged!');
    setForm({
      deviceId: '',
      facility: '',
      trainer: '',
      checklist: [],
      feedback: '',
      photo: null,
      status: 'Pending',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCheckbox = (item) => {
    setForm((prev) => ({
      ...prev,
      checklist: prev.checklist.includes(item)
        ? prev.checklist.filter((i) => i !== item)
        : [...prev.checklist, item],
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQRScan = (data) => {
    if (data) {
      setForm((prev) => ({ ...prev, deviceId: data }));
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>Log New Installation</Typography>
      <Paper sx={{ p: 3 }} component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <QRScanner onScan={handleQRScan} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Device ID" name="deviceId" value={form.deviceId} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Facility" name="facility" value={form.facility} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Trainer" name="trainer" value={form.trainer} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Checklist</Typography>
            <FormGroup row>
              {checklistItems.map(item => (
                <FormControlLabel
                  key={item}
                  control={
                    <Checkbox
                      checked={form.checklist.includes(item)}
                      onChange={() => handleCheckbox(item)}
                    />
                  }
                  label={item}
                />
              ))}
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Training Feedback"
              name="feedback"
              value={form.feedback}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" component="label">
              Upload Unboxing Photo
              <input type="file" hidden accept="image/*" onChange={handlePhotoUpload} />
            </Button>
            {form.photo && (
              <Box mt={2}>
                <img src={form.photo} alt="Uploaded" width={200} />
              </Box>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">Submit</Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Installation;
