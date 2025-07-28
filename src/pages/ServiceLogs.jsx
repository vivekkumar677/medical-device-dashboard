import React, { useState } from 'react'; 
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, Grid, IconButton, InputLabel, List, ListItem, ListItemText, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { addLog, deleteLog, updateLog } from '../redux/slices/serviceLogsSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';

const ServiceLogs = () => {
    const dispatch = useDispatch();
    const logs = useSelector((state) => state.serviceLogs.list);
    const [form, setForm] = useState({
        deviceId: '',
        date: '',
        engineer: '',
        notes: '',
        purpose: '',
        photo: null,
        status: 'Pending',
    });
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [open, setOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.photo) {
            alert('Please upload a photo or PDF.');
            return;
        }
        if (editMode) {
            dispatch(updateLog({ ...form, id: editId }));
        } else {
            dispatch(addLog({ ...form, id: Date.now() }));
        }
        setForm({ deviceId: '', date: '', engineer: '', notes: '', purpose: '', photo: null, status: 'Pending' });
        setEditMode(false);
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setForm({ ...form, photo: file });
    };

    const handleDelete = (id) => {
        dispatch(deleteLog(id));
    };

    const handleEdit = (log) => {
        setForm(log);
        setEditId(log.id);
        setEditMode(true);
        setOpen(true);
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>Service Visit Logs</Typography>
            <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 2 }}>Add New Log</Button>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{editMode ? 'Edit Log' : 'Add Log'}</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="Device ID" name='deviceId' value={form.deviceId} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="Date" name='date' type='date' InputLabelProps={{ shrink: true }} value={form.date} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Engineer Name" name='engineer' value={form.engineer} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth select label="Purpose" name='purpose' value={form.purpose} onChange={handleChange} required>
                                    <MenuItem value="Preventive">Preventive</MenuItem>
                                    <MenuItem value="Breakdown">Breakdown</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth multiline rows={3} label="Visit Notes" name='notes' value={form.notes} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>Upload Photo or PDF</InputLabel>
                                <input type="file" accept="image/*,.pdf" onChange={handleFileChange} required={!editMode} />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">{editMode ? 'Update' : 'Add'}</Button>
                </DialogActions>
            </Dialog>

            <Typography variant='h6'>Logged Visits</Typography>
            <List>
                {logs.map((log) => (
                    <ListItem key={log.id} secondaryAction={
                        <>
                            <IconButton edge="end" onClick={() => handleEdit(log)}><EditIcon /></IconButton>
                            <IconButton edge="end" onClick={() => handleDelete(log.id)}><DeleteIcon /></IconButton>
                        </>
                    }>
                        <ListItemText primary={`${log.date} - ${log.deviceId} (${log.purpose})`} secondary={`${log.engineer}: ${log.notes}`} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default ServiceLogs;
