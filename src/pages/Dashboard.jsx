import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDevices } from "../redux/slices/devicesSlice";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AuthContext } from "../context/AuthContext";
import { CSVLink } from 'react-csv';
import QRScanner from "../components/QRScanner";
import { useLocalStorage } from "../hooks/useLocalStorage";

const dummyDevices = [
    {
        id: 'D001',
        type: 'Monitor',
        facility: 'City Hospital',
        status: 'Online',
        battery: 80,
        lastService: '2025-06-15',
        amcStatus: 'Active',
    },
    {
        id: 'D002',
        type: 'Ventilator',
        facility: 'Metro Clinic',
        status: 'Maintenance',
        battery: 45,
        lastService: '2025-05-10',
        amcStatus: 'Expiring',
    },
    {
        id: 'D003',
        type: 'ECG Monitor',
        facility: 'City Hospital',
        status: 'Offline',
        battery: 45,
        lastService: '2025-03-12',
        amcStatus: 'Active',
    },
    {
        id: 'D004',
        type: 'Heart Monitor',
        facility: 'City Hospital',
        status: 'Online',
        battery: 45,
        lastService: '2025-03-12',
        amcStatus: 'Active',
    },
    {
        id: 'D005',
        type: 'Oxygen Cylinder',
        facility: 'City Hospital',
        status: 'Online',
        battery: 45,
        lastService: '2025-03-12',
        amcStatus: 'Active',
    },
];

const columns = [
  { field: 'id', headerName: 'Device ID', width: 130 },
  { field: 'type', headerName: 'Type', width: 150 },
  { field: 'facility', headerName: 'Facility', width: 180 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'battery', headerName: 'Battery (%)', type: 'number', width: 130 },
  { field: 'lastService', headerName: 'Last Service', width: 150 },
  { field: 'amcStatus', headerName: 'AMC/CMC Status', width: 160 },
];

const rows = dummyDevices.map((device) => ({
  id: device.id,
  type: device.type,
  facility: device.facility,
  status: device.status,
  battery: device.battery,
  lastService: device.lastService,
  amcStatus: device.amcStatus,
}));

const Dashboard = () => {

    const { role } = useContext(AuthContext);
    const dispatch = useDispatch();
    const devices = useSelector((state) => state.devices.list);
    const [storedDevices, setStoredDevices] = useLocalStorage('devices', []);

    const handleScan = (data) => {
        if (data) {
            const found = devices.find((d) => d.id === data);
            if (found) {
            alert(`Device found: ${found.id} - ${found.type}`);
            } else {
            alert(`Device ID "${data}" not found.`);
            }
        }
    };

    useEffect(() => {
        if (storedDevices.length === 0) {
         // same as your previous dummyDevices array
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
            <CSVLink data={devices} headers={deviceHeaders} filename="devices.csv" style={{ textDecoration: 'none' }}>
                <Button variant="outlined" color="primary">Export Devices</Button>
            </CSVLink>
            {role !== 'technician' ? (
                <DataGrid 
                    rows={devices}
                    columns={columns}
                    autoHeight
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            ) : (
                <Typography>Technician have view-only access.</Typography>
            )}
            <Box mt={4}>
                <Typography variant="h6">Scan QR Code</Typography>
                <QRScanner onScan={handleScan} />
                <p>Working on the QR code scanner...</p>
            </Box>
        </Box>
    )
};

export default Dashboard;