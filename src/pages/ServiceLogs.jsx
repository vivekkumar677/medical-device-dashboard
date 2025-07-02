import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, IconButton, List, ListItem, ListItemText, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { addLog, deleteLog } from '../redux/slices/serviceLogsSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';

const ServiceLogs = () => {
    const dispatch = useDispatch();
    const logs = useSelector((state) => state.serviceLogs.list);
    const [form ,setForm] = useState({
        deviceId: '',
        date: '',
        engineer: '',
        notes: '',
        purpose: '',
        photo: null,
        status: 'Pending',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addLog({...form, id: Date.now()}));
        setForm({ deviceId: '', date: '', engineer: '', notes: '', purpose: '', photo: null, status: 'Pending', });
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    };

    const handleDelete = (id) => {
        dispatch(deleteLog(id));
    };

    return (
        <Box sx={{p:4}}>
            <Typography variant="h5" gutterBottom>Service visit Logs</Typography>
            <Paper sx={{p:3, mb:4}} component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Device ID" name='deviceId' value={form.deviceId} onChange={handleChange} required/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Date" name='date' type='date' InputLabelProps={{shrink: true}} value={form.date} onChange={handleChange} required/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Engineer Name" name='engineer' value={form.engineer} onChange={handleChange} required/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            fullWidth select
                            label="Purpose"
                            name='purpose'
                            value={form.purpose}
                            onChange={handleChange}
                            required
                            >
                            <MenuItem value="Preventive">Preventive</MenuItem>
                            <MenuItem value="Breakdown">Breakdown</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth multiline rows={3} label="Visit Notes" name='notes' value={form.notes} onChange={handleChange} required/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type='submit' variant='contained'>Add Log</Button>
                    </Grid>
                </Grid>
            </Paper>
            <Typography variant='h6'>Logged Visits</Typography>
            <List>
                {logs.map((log) => (
                    <ListItem
                        key={log.id}
                        secondaryAction={
                            <IconButton edge="end" onClick={() => handleDelete(log.id)}><DeleteIcon /></IconButton>
                        }
                    >
                        <ListItemText primary={`${log.date} - ${log.deviceId} ${log.purpose}`} secondary={`${log.engineer}: ${log.notes}`} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

};

export default ServiceLogs;