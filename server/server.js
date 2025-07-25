require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Post a device
app.post('/devices', async (req, res) => {
    const {
      device_id,
      type,
      facility,
      status,
      battery,
      last_service,
      amc_status,
    } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO devices (device_id, type, facility, status, battery, last_service, amc_status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [device_id, type, facility, status, battery, last_service, amc_status]
        );
        res.status(201).json({ message: 'Device added successfully', device: result.rows[0] });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Server failed to add device' });
    }
});

// Get all devices
app.get('/devices/all', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM devices');
        res.json(result.rows);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Server failed to fetch devices' });
    }
});

// Get a specific device
app.get('/devices/:deviceId', async (req, res) => {
    const { deviceId } = req.params;
    try {
        const result = await pool.query('SELECT * FROM devices WHERE device_id = $1', [deviceId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Device not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Server failed to fetch device' });
    }
});

// Delete a specific device
app.delete('/devices/:deviceId', async (req, res) => {
    const { deviceId } = req.params;
    try {
        const result = await pool.query('DELETE FROM devices WHERE device_id = $1', [deviceId]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Device not found' });
        }
        res.json({ message: 'Device deleted successfully' });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Server failed to delete device' });
    }
});

// Update a specific device
app.put('/devices/:deviceId', async (req, res) => {
    const { deviceId } = req.params;
    const { type, facility, status, battery, last_service, amc_status } = req.body;
    try {
        const result = await pool.query(
            'UPDATE devices SET type = $1, facility = $2, status = $3, battery = $4, last_service = $5, amc_status = $6 WHERE device_id = $7 RETURNING *',
            [type, facility, status, battery, last_service, amc_status, deviceId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Device not found' });
        }
        res.json({ message: 'Device updated successfully', device: result.rows[0] });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Server failed to update device' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});