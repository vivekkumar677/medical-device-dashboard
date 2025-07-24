import React, { useState } from "react";
import { addAlert, deleteAlert } from "../redux/slices/alertsSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";

const Alerts = () => {

    const dispatch = useDispatch();
    const alerts = useSelector((state) => state.alerts.list);

    const [form, setForm] = useState({
        deviceId: '',
        description: '',
        photo: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newAlert = { ...form, id: Date.now() };
        dispatch(addAlert(newAlert));
        setForm({ deviceId: '', description: '', photo: null, });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setForm((prev) => ({ ...prev, photo: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDelete = (id) => {
        dispatch(deleteAlert(id));
    };


    return (
        <Box sx={{p:4}}>
            <Typography variant="h5" gutterBottom>Device Alerts & Photo Logs</Typography>
            <Paper sx={{p:3, mb:4}} component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Device ID" name="deviceId" value={form.deviceId} onChange={handleChange} required />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            fullWidth 
                            multiline
                            rows={3}
                            label="Alert Description" 
                            name="description" 
                            value={form.description} 
                            onChange={handleChange} 
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" component="label">
                            Upload Photo
                            <input type="file" hidden accept="image/*" onChange={handlePhotoUpload} />
                        </Button>
                        {form.photo && (
                            <Box mt={2}>
                                <img src={form.photo} alt="Preview" width={200} />
                            </Box>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained">Submit Alert</Button>
                    </Grid>
                </Grid>
            </Paper>
            <Typography variant="h6">Submitted Alerts</Typography>
            <Grid container spacing={2}>
                {alerts.map(alert => (
                    <Grid item xs={12} sm={6} md={4} key={alert.id}>
                        <Card>
                            {alert.photo && (
                                <CardMedia component="img" height="180" image={alert.photo} alt="alert" />
                            )}
                            <CardContent>
                                <Typography variant="subtitle1">Device: {alert.deviceId}</Typography>
                                <Typography variant="body2">Description: {alert.description}</Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton onClick={() => handleDelete(alert.id)}><DeleteIcon /></IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
};

export default Alerts;