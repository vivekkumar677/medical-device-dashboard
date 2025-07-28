require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ====================== ROUTES ======================

// POST /devices – Add new device
app.post('/devices', async (req, res) => {
  const {
    device_id: id,
    type,
    facility,
    status,
    battery,
    lastService: last_service_camel,
    last_service: last_service_snake,
    amcStatus: amc_status_camel,
    amc_status: amc_status_snake,
  } = req.body;

  if (!id) {
      return res.status(400).json({ error: "Device ID is required" });
    }

  // Validate battery is a number if present
  if (battery && isNaN(parseInt(battery))) {
    return res.status(400).json({ error: "Battery must be a number" });
  }
  
  // Testing purpose
  console.log('Received payload:', req.body);
  const lastService = last_service_camel || last_service_snake || null;
  const amcStatus = amc_status_camel || amc_status_snake || null;
  console.log('Received payload:', req.body);
  console.log('Parsed lastService:', lastService);
  console.log('Parsed amcStatus:', amcStatus);
  console.log('Parsed id:', id);

  try {
    // Check for existing device
    const existing = await pool.query(
      `SELECT device_id FROM devices WHERE device_id = $1`,
      [id]
    );

    if (existing.rowCount > 0) {
      return res.status(409).json({ error: `Device with ID ${id} already exists` });
    }
    const result = await pool.query(
      `INSERT INTO devices (device_id, type, facility, status, battery, last_service, amc_status)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING device_id AS id, type, facility, status, battery, last_service AS "lastService", amc_status AS "amcStatus"`,
      [id, type, facility, status, battery, lastService, amcStatus]
    );

    res.status(201).json({
      message: 'Device added successfully',
      device: result.rows[0]
    });
  } catch (error) {
    console.error('Database error (POST):', error);
    res.status(500).json({ error: 'Failed to add device' });
  }
});

// GET /devices/all – Get all devices
app.get('/devices/all', async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT device_id AS id, type, facility, status, battery, last_service AS "lastService", amc_status AS "amcStatus"
       FROM devices`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Database error (GET all):', error);
    res.status(500).json({ error: 'Failed to fetch devices' });
  }
});

// GET /devices/:id – Get specific device
app.get('/devices/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT device_id AS id, type, facility, status, battery, last_service AS "lastService", amc_status AS "amcStatus"
       FROM devices WHERE device_id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Device not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Database error (GET one):', error);
    res.status(500).json({ error: 'Failed to fetch device' });
  }
});

// PUT /devices/:id – Update device
app.put('/devices/:id', async (req, res) => {
  const { id } = req.params;
  const {
    type,
    facility,
    status,
    battery,
    lastService,
    amcStatus
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE devices
       SET type = $1,
           facility = $2,
           status = $3,
           battery = $4,
           last_service = $5,
           amc_status = $6
       WHERE device_id = $7
       RETURNING device_id AS id, type, facility, status, battery, last_service AS "lastService", amc_status AS "amcStatus"`,
      [type, facility, status, battery, lastService, amcStatus, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Device not found for update' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Database error (PUT):', error);
    res.status(500).json({ error: 'Failed to update device' });
  }
});

// DELETE /devices/:id – Delete device
app.delete('/devices/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM devices WHERE device_id = $1 RETURNING *',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Device not found for deletion' });
    }

    res.json({ message: 'Device deleted successfully' });
  } catch (error) {
    console.error('Database error (DELETE):', error);
    res.status(500).json({ error: 'Failed to delete device' });
  }
});

// ====================== START SERVER ======================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
