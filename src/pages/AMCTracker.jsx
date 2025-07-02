import React, { useState } from "react";
import { addContract, deleteContracts } from '../redux/slices/amcCmcSlice'
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Grid, IconButton, List, ListItem, ListItemText, Paper, TextField, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {format, differenceInDays} from 'date-fns';
import { CSVLink } from 'react-csv';

const AMCTracker = () => {

    const dispatch = useDispatch();
    const contracts = useSelector((state) => state.amcCmc.list);

    const [form, setForm] = useState({
        deviceId: '',
        facility: '',
        startDate: '',
        endDate: '',
    });

    const headers = [
        { label: 'Device ID', key: 'deviceId' },
        { label: 'Facility', key: 'facility' },
        { label: 'Start Date', key: 'startDate' },
        { label: 'End Date', key: 'endDate' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addContract({...form, id: Date.now()}));
        setForm({ deviceId: '', facility: '', startDate: '', endDate: '', });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const isExpiringSoon = (endDate) => {
        const daysLeft = differenceInDays(new Date(endDate), new Date());
        return daysLeft <= 30;
    };

    const handleDelete = (id) => {
        dispatch(deleteContracts(id));
    };

    return (
        <Box sx={{p:4}}>
            <Typography variant="h5" gutterBottom>AMC/CMC Contract Tracker</Typography>
            <Paper sx={{p:3, mb:4}} component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Device ID" name="deviceId" value={form.deviceId} onChange={handleChange} required/>
                    </Grid>
                    <Grid item sx={12} sm={6}>
                        <TextField fullWidth label="Facility" name="facility" value={form.facility} onChange={handleChange} required />
                    </Grid>
                    <Grid item sx={12} sm={6}>
                        <TextField fullWidth label="Start Date" type="date" name="startDate" InputLabelProps={{ shrink: true }} value={form.startDate} onChange={handleChange} required />
                    </Grid>
                    <Grid item sx={12} sm={6}>
                        <TextField fullWidth label="End Date" type="date" name="endDate" InputLabelProps={{ shrink: true }} value={form.endDate} onChange={handleChange} required />
                    </Grid>
                    <Grid item sx={12}>
                        <Button variant="contained" type="submit">Add Contract</Button>
                    </Grid>
                </Grid>
            </Paper>
            <Typography variant="h6">Contract List</Typography>
            <List>
                {contracts.map((contract) => (
                <ListItem key={contract.id} sx={{ bgcolor: isExpiringSoon(contract.endDate) ? '#fff3e0' : 'transparent' }}>
                    <ListItemText 
                        primary={`${contract.deviceId} (${contract.facility})`}
                        secondary={`Start: ${format(new Date(contract.startDate), 'yyyy-MM-dd')} | End: ${format(new Date(contract.endDate), 'yyyy-MM-dd')}`}
                    />
                    <IconButton onClick={() => handleDelete(contract.id)}><DeleteIcon /></IconButton>
                </ListItem>
                ))}
            </List>
            <CSVLink data={contracts} headers={headers} filename="amc-contracts.csv" style={{ textDecoration: 'none', color: 'inherit'}}>
                <Button variant="outlined">Export Contracts to CSV</Button>
            </CSVLink>
        </Box>
    );
};

export default AMCTracker;