import React, { useEffect, useState, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addDevice,
  setDevices,
  updateDevice,
  deleteDevice,
} from "../redux/slices/devicesSlice";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";


// const BASE_URL = "https://medical-device-dashboard-9ee9.onrender.com";

const Dashboard = () => {
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices.list);

  // Use role and loginAs from context
  const { role, loginAs } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newDevice, setNewDevice] = useState({
    device_id: "",
    type: "",
    facility: "",
    battery: "",
    status: "",
    amcStatus: "",
  });

  const [editingDevice, setEditingDevice] = useState({
    device_id: "",
    type: "",
    facility: "",
    battery: "",
    status: "",
    amcStatus: "",
  });

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/devices/all`);
        const data = res.data;

        const validDevices = data
          .map((d) => ({
            ...d,
            device_id: d.device_id || d.id,
          }))
          .filter((d) => d.device_id);

        dispatch(setDevices(validDevices));
      } catch (error) {
        console.error("Failed to fetch devices:", error);
      }
    };

    fetchDevices();
  }, [dispatch]);

  const handleAddDevice = async () => {
    if (!newDevice.device_id) {
      alert("Device ID is required.");
      return;
    }

    const isDuplicate = devices.some((d) => d.device_id === newDevice.device_id);
    if (isDuplicate) {
      alert("Device ID must be unique.");
      return;
    }

    const payload = {
      device_id: newDevice.device_id.trim(),
      type: newDevice.type,
      facility: newDevice.facility,
      status: newDevice.status,
      battery: parseInt(newDevice.battery),
      lastService: null,
      amcStatus: newDevice.amcStatus || null,
    };

    try {
      const res = await axios.post(`http://localhost:5000/devices`, payload);

      if (res.status === 201 && res.data.device) {
        const addedDevice = {
          ...res.data.device,
          device_id: res.data.device.device_id,
        };

        dispatch(addDevice(addedDevice));
        setOpen(false);
        setNewDevice({
          device_id: "",
          type: "",
          facility: "",
          battery: "",
          status: "",
          amcStatus: "",
        });
      } else {
        alert("Failed to add device");
      }
    } catch (err) {
      console.error("Add device error:", err);
      alert("Error adding device");
    }
  };

  const handleUpdateDevice = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/devices/${editingDevice.device_id}`,
        {
          ...editingDevice,
        }
      );

      if (res.status === 200) {
        dispatch(updateDevice(editingDevice));
        setEditDialogOpen(false);
      } else {
        alert("Failed to update device");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Error updating device");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/devices/${id}`);
      if (res.status === 200) {
        dispatch(deleteDevice(id));
      } else {
        alert("Delete failed");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting device");
    }
  };

  const baseColumns = [
    { field: "device_id", headerName: "Device ID", width: 120 },
    { field: "type", headerName: "Type", width: 150 },
    { field: "facility", headerName: "Facility", width: 150 },
    { field: "battery", headerName: "Battery", width: 100 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "amcStatus", headerName: "AMC/CMC Status", width: 150 },
  ];

  const adminActionsColumn = {
    field: "actions",
    headerName: "Actions",
    width: 200,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <>
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            setEditingDevice(params.row);
            setEditDialogOpen(true);
          }}
          sx={{ mr: 1 }}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => handleDelete(params.row.device_id)}
        >
          Delete
        </Button>
      </>
    ),
  };

  const columns = role === "admin" ? [...baseColumns, adminActionsColumn] : baseColumns;

  return (
    <div style={{ padding: 20 }}>
      <h2>Medical Device Dashboard</h2>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={devices.filter((d) => d.device_id)}
          columns={columns}
          getRowId={(row) => row.device_id}
          autoHeight
          rowsPerPageOptions={[5]}
          checkboxSelection={role === "admin"}
        />
      </div>

      {/* Add Device Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Device</DialogTitle>
        <Box onSubmit={handleAddDevice}>
          <DialogContent>
            <TextField
              label="Device ID"
              value={newDevice.device_id}
              onChange={(e) =>
                setNewDevice({ ...newDevice, device_id: e.target.value })
              }
              fullWidth
              required
            />
            <TextField
              label="Type"
              value={newDevice.type}
              onChange={(e) => setNewDevice({ ...newDevice, type: e.target.value })}
              fullWidth
            />
            <TextField
              label="Facility"
              value={newDevice.facility}
              onChange={(e) =>
                setNewDevice({ ...newDevice, facility: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Battery"
              type="number"
              value={newDevice.battery}
              onChange={(e) =>
                setNewDevice({ ...newDevice, battery: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Status"
              value={newDevice.status}
              onChange={(e) => setNewDevice({ ...newDevice, status: e.target.value })}
              fullWidth
            />
            <TextField
              label="AMC/CMC Status"
              value={newDevice.amcStatus}
              onChange={(e) =>
                setNewDevice({ ...newDevice, amcStatus: e.target.value })
              }
              fullWidth
            />
          </DialogContent>
        </Box>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddDevice} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Device Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Device</DialogTitle>
        <DialogContent>
          <TextField
            label="Type"
            value={editingDevice.type}
            onChange={(e) =>
              setEditingDevice({ ...editingDevice, type: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Facility"
            value={editingDevice.facility}
            onChange={(e) =>
              setEditingDevice({ ...editingDevice, facility: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Battery"
            type="number"
            value={editingDevice.battery}
            onChange={(e) =>
              setEditingDevice({ ...editingDevice, battery: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Status"
            value={editingDevice.status}
            onChange={(e) =>
              setEditingDevice({ ...editingDevice, status: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="AMC/CMC Status"
            value={editingDevice.amcStatus}
            onChange={(e) =>
              setEditingDevice({ ...editingDevice, amcStatus: e.target.value })
            }
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateDevice} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;