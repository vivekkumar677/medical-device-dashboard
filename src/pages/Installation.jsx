import {
  Box, Button, Checkbox, FormControlLabel, FormGroup, Grid,
  Paper, TextField, Typography, IconButton
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addInstallation } from "../redux/slices/installationsSlices";
import { useLocalStorage } from "../utils/useLocalStorage";
import QRScanner from "../components/QRScanner";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// ... [imports remain unchanged]

const checklistItems = ['Unboxed device', 'Power test', 'Connectivity check', 'Initial setup'];

const Installation = () => {
  const dispatch = useDispatch();
  const [installations, setInstallations] = useLocalStorage('installations', []);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    deviceId: '',
    facility: '',
    trainer: '',
    checklist: [],
    feedback: '',
    photo: null,
    photoName: '',
    status: 'Pending',
  });

  const isComplete = (
    form.deviceId &&
    form.facility &&
    form.trainer &&
    form.feedback.trim() !== '' &&
    form.photo &&
    form.checklist.length === checklistItems.length
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.feedback || !form.photo) {
      alert("Please upload photo and provide feedback before submitting.");
      return;
    }

    const updatedEntry = {
      ...form,
      id: editId || Date.now(),
      status: isComplete ? 'Completed' : 'Pending',
    };

    let updatedList;
    if (editId) {
      updatedList = installations.map((inst) => inst.id === editId ? updatedEntry : inst);
    } else {
      dispatch(addInstallation(updatedEntry));
      updatedList = [...installations, updatedEntry];
    }

    setInstallations(updatedList);
    alert(editId ? 'Installation updated!' : 'Installation logged!');

    setForm({
      deviceId: '',
      facility: '',
      trainer: '',
      checklist: [],
      feedback: '',
      photo: null,
      photoName: '',
      status: 'Pending',
    });
    setEditId(null);
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
        setForm((prev) => ({
          ...prev,
          photo: reader.result,
          photoName: file.name,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQRScan = (data) => {
    if (data) {
      setForm((prev) => ({ ...prev, deviceId: data }));
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
  };

  const handleDelete = (id) => {
    const filtered = installations.filter((item) => item.id !== id);
    setInstallations(filtered);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        {editId ? 'Edit Installation' : 'Log New Installation'}
      </Typography>

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
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" component="label">
              Upload Photo / PDF
              <input type="file" hidden accept="image/*,.pdf" onChange={handlePhotoUpload} />
            </Button>
            {form.photo && (
              <Box mt={2}>
                <Typography variant="body2">{form.photoName}</Typography>
                {form.photo.startsWith('data:image') && (
                  <img src={form.photo} alt="Preview" width={200} />
                )}
              </Box>
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" color={isComplete ? 'green' : 'orange'}>
              Current Status: {isComplete ? 'Completed' : 'Pending'}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" disabled={!isComplete}>
              {editId ? 'Update' : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>Saved Installations</Typography>
        {installations.map(item => (
          <Box key={item.id} sx={{ my: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography><strong>Device:</strong> {item.deviceId}</Typography>
            <Typography><strong>Facility:</strong> {item.facility}</Typography>
            <Typography><strong>Status:</strong> {item.status}</Typography>
            <Box sx={{ mt: 1 }}>
              <IconButton onClick={() => handleEdit(item)}><EditIcon /></IconButton>
              <IconButton onClick={() => handleDelete(item.id)}><DeleteIcon /></IconButton>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Installation;