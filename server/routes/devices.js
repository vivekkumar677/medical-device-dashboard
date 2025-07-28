const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all /api/devices/:deviceId
router.get('/:deviceId', async (req, res) => {
    const { deviceId } = req.params;

    try {
        const result = await pool.query('SELECT * FROM devices WHERE device_id = $1', [deviceId]);
        
        if(result.rows.length === 0) {
            return res.status(404).json({ message: 'Device not found' });
        }
        res.json(result.rows);
    } catch (error) {
        console.error('Database error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Post /api/devices/:deviceId
router.post('/devices', async (req, res) => {

    const {
      device_id,
      device_type,
      facility,
      status,
      battery,
      last_service,
      amc_status,
    } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO devices (device_id, type, facility, status, battery, last_service, amc_status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [device_id, device_type, facility, status, battery, last_service, amc_status]
        );
        res.status(201).json({ message: 'Device added successfully', device: result.rows[0] });
    } catch (error) {
        console.error('Database error:', error.message);
        res.status(500).json({ error: 'Server failed to add device' });
    }
});

module.exports = router;