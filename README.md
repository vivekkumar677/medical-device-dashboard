1. Folder Structure
# medical-device-dashboardsrc/

2. Module Development Breakdown
(1). Device Inventory Dashboard
    Data Table with:
        Device Type, ID, Facility
        Status (Online/Offline/Maintenance)
        Battery %, Last Service Date, AMC/CMC status
        Use @mui/x-data-grid or card components
        Redux slice: devicesSlice.js
        Mock data via json-server or localStorage
(2). Installation & Training Module
    Form with:
        Device ID (dropdown/search)
        Upload photos (before/after)
        Checklist (checkboxes)
        Training feedback and completion status
        File upload: Use base64/local URL or simulate server upload
        Track with Redux slice: installationsSlice.js
(3). Service Visit Logs
    Fields:
        Date, Engineer, Purpose (Preventive/Breakdown)
        Visit notes
        File upload (PDF/photo)
        Log display with filtering by facility/date/device
        Redux slice: serviceLogsSlice.js
(4). AMC/CMC Tracker
    Contract details per device:
        Start/End dates
        Status (Active/Expiring)
        Display upcoming expiries
        Support export to CSV (use json2csv or xlsx)
        Redux slice: amcCmcSlice.js
(5). Alerts & Photo Logs
    Show alert logs: type, description, date
        Attach photos of issues
        Option to mark alerts resolved
        Redux slice: alertsSlice.js
(6). QR Code Scanner UI for device identification
    Display QR Code: QR Code-based device identification
(7). Theme toggler
    Theme toggler switcher with dark & light mode
(8). CSV 
    CSV exports: csv export button added to export the data
(9). User restriction
    Role based UI restriction implemented (Admin, Technician)
(10). Local Storage
    data persistence of local storage

# Medical Device Admin Dashboard

## 🛠️ Tech Stack
- ReactJS
- Redux Toolkit
- Material UI
- SCSS Modules
- Mock API: `json-server` / localStorage

## 🚀 Features
- Inventory Dashboard
- Installation & Training Forms
- Service Visit Logs
- AMC/CMC Tracker
- Alerts & Photo Logs

## 📦 Setup
```bash
git clone https://github.com/vivekkumar677/medical-device-dashboard.git
cd medical-device-dashboard
npm install
npm run dev
