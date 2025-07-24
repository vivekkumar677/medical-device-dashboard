import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDevices } from "../redux/slices/devicesSlice";
import {
  Box, Button, Typography, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AuthContext } from "../context/AuthContext";
import { CSVLink } from 'react-csv';
import QRScanner from "../components/QRScanner";
import { useLocalStorage } from "../hooks/useLocalStorage";

const dummyDevices = [/* same device array */];

const columns = [
  { field: 'id', headerName: 'Device ID', width: 130 },
  { field: 'type', headerName: 'Type', width: 150 },
  { field: 'facility', headerName: 'Facility', width: 180 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'battery', headerName: 'Battery (%)', type: 'number', width: 130 },
  { field: 'lastService', headerName: 'Last Service', width: 150 },
  { field: 'amcStatus', headerName: 'AMC/CMC Status', width: 160 },
];

const Dashboard = () => {
  const { role } = useContext(AuthContext);
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices.list);
  const [storedDevices, setStoredDevices] = useLocalStorage('devices', []);
  const [scannedDevice, setScannedDevice] = useState(null);

  const handleScan = (data) => {
    setScannedDevice(data);
    alert(`Device found: ${data}`);

  };

  useEffect(() => {
    if (storedDevices.length === 0) {
      dispatch(setDevices(dummyDevices));
      setStoredDevices(dummyDevices);
    } else {
      dispatch(setDevices(storedDevices));
    }
  }, [dispatch, setStoredDevices, storedDevices]);

  const deviceHeaders = [
    { label: 'ID', key: 'id' },
    { label: 'Type', key: 'type' },
    { label: 'Facility', key: 'facility' },
    { label: 'Status', key: 'status' },
    { label: 'Battery', key: 'battery' },
    { label: 'Last Service', key: 'lastService' },
    { label: 'AMC/CMC', key: 'amcStatus' }
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

      {role === 'technician' && (
        <>
          <Typography variant="h6" mt={2}>Scan Device QR Code</Typography>
          <QRScanner onScan={handleScan} />

          {scannedDevice && (
            <Box mt={2}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="subtitle1">Scanned Device Info</Typography>
                <Typography><strong>ID:</strong> {scannedDevice.id}</Typography>
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
