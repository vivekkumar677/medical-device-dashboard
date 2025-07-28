import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDevices } from "../redux/slices/devicesSlice";
import {
  Box, Button, Typography, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AuthContext } from "../context/AuthContext";
import { CSVLink } from 'react-csv';
import QRScanner from "../components/QRScanner";
import { useLocalStorage } from "../utils/useLocalStorage";

const Dashboard = () => {
  const { role } = useContext(AuthContext);
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices.list);
  const [storedDevices, setStoredDevices] = useLocalStorage('devices', []);
  const [scannedDevice, setScannedDevice] = useState(null);
  const [editingDevice, setEditingDevice] = useState(null);

  const handleScan = (data) => {
    console.log("Raw QR Code content:", data);
    try {
      const parsed = JSON.parse(data);
      setScannedDevice(parsed);
      console.log("Parsed QR data:", parsed);
    } catch (err) {
      console.error("Invalid QR code data. Must be JSON.", err);
    }
  };

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch('http://localhost:5000/devices/all');
        const data = await response.json();
        setStoredDevices(data);
        dispatch(setDevices(data));
      } catch (error) {
        console.error('Error fetching devices from backend:', error);
      }
    };
    fetchDevices();
  }, [dispatch]);

  const deviceHeaders = [
    { label: 'ID', key: 'id' },
    { label: 'Type', key: 'type' },
    { label: 'Facility', key: 'facility' },
    { label: 'Status', key: 'status' },
    { label: 'Battery', key: 'battery' },
    { label: 'Last Service', key: 'lastService' },
    { label: 'AMC/CMC', key: 'amcStatus' }
  ];

  const columns = [
    { field: 'id', headerName: 'Device ID', width: 130 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'facility', headerName: 'Facility', width: 180 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'battery', headerName: 'Battery (%)', type: 'number', width: 130 },
    { field: 'lastService', headerName: 'Last Service', width: 150 },
    { field: 'amcStatus', headerName: 'AMC/CMC Status', width: 160 },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => (
        <Button variant="outlined" onClick={() => setEditingDevice(params.row)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Medical Device Dashboard
      </Typography>

      {role === 'admin' && (
        <>
          <CSVLink
            data={devices}
            headers={deviceHeaders}
            filename="devices.csv"
            style={{ textDecoration: 'none' }}
          >
            <Button variant="outlined" color="primary" sx={{ mb: 2 }}>
              Export Devices
            </Button>
          </CSVLink>

          <DataGrid
            rows={devices}
            columns={columns}
            autoHeight
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </>
      )}

      {editingDevice && (
        <Dialog  open onClose={() => setEditingDevice(null)}>
          <DialogTitle>Edit Device</DialogTitle>
          <DialogContent>
            <Box mt={4} mb={4} display="flex" flexDirection="column" gap={2}>
              <TextField fullWidth label="Type" value={editingDevice.type} onChange={(e) => setEditingDevice({ ...editingDevice, type: e.target.value })} fullWidth />
              <TextField label="Facility" value={editingDevice.facility} onChange={(e) => setEditingDevice({ ...editingDevice, facility: e.target.value })} fullWidth />
              <TextField label="Battery" type="number" value={editingDevice.battery} onChange={(e) => setEditingDevice({ ...editingDevice, battery: e.target.value })} fullWidth />
              <TextField label="Status" value={editingDevice.status} onChange={(e) => setEditingDevice({ ...editingDevice, status: e.target.value })} fullWidth />
              <TextField label="AMC/CMC Status" value={editingDevice.amcStatus} onChange={(e) => setEditingDevice({ ...editingDevice, amcStatus: e.target.value })} fullWidth />
            </Box>  
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditingDevice(null)}>Cancel</Button>
            <Button
              onClick={async () => {
                try {
                  const response = await fetch(`http://localhost:5000/devices/${editingDevice.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(editingDevice),
                  });
                  const updated = await response.json();
                  const updatedList = devices.map((d) => (d.id === updated.id ? updated : d));
                  dispatch(setDevices(updatedList));
                  setEditingDevice(null);
                } catch (err) {
                  console.error("Failed to update:", err);
                }
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {role === 'technician' && (
        <>
          <Typography variant="h6" mt={2}>Scan Device QR Code</Typography>
          <QRScanner onScan={handleScan} />

          {scannedDevice && (
            <Box mt={2}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="subtitle1">Scanned Device Info</Typography>
                <Typography><strong>ID:</strong> {scannedDevice.id || scannedDevice.device_id}</Typography>
                <Typography><strong>Type:</strong> {scannedDevice.type}</Typography>
                <Typography><strong>Status:</strong> {scannedDevice.status}</Typography>
                <Typography><strong>Facility:</strong> {scannedDevice.facility}</Typography>
              </Paper>
            </Box>
          )}

          <Box mt={4}>
            <Typography variant="h6">All Devices (View Only)</Typography>
            <TableContainer component={Paper} sx={{ mt: 1 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Facility</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {devices.map((device) => (
                    <TableRow key={device.id}>
                      <TableCell>{device.id}</TableCell>
                      <TableCell>{device.type}</TableCell>
                      <TableCell>{device.status}</TableCell>
                      <TableCell>{device.facility}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Dashboard;
