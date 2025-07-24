1. Folder Structure
# medical-device-dashboardsrc/

A resposive React-based admin panel to manage medical device inventories, intallation logs, service visits, AMC/CMC contracts, alerts , and CRM data across medical facilities.

## 🛠 Tech Stack
- **ReactJS** + **Redux** for front-end state management
- **Material UI** + **SCSS Modules** for styling
- **React Router DOM** for routing
- **QR Code Scanner** (via `react-qr-reader`)
- **CSV Export** via `react-csv`
- **Mock API** via `json-server` or **localStorage**

## ✅ Core Module Features

### 1. **Device Inventory Dashboard**
- Displays device ID, type, facility, status, battery level, last service date, AMC/CMC status
- Export device data to CSV
- Role-based display: Admin gets editable grid, Technician gets view-only table

### 2. **Installation & Training Module**
- Log new installations with:
  - Device checklist
  - Facility & trainer info
  - Feedback notes
  - Unboxing photo upload
  - QR Code scanner for auto Device ID fill
- Tracks installation completion status
- Edit/Delete entries from localStorage

### 3. **Service Visit Logs**
- Records Preventive and Breakdown service visits
- Includes engineer details, purpose, notes, and photo/PDF upload

### 4. **AMC/CMC Tracker**
- Tracks maintenance contract status and expiry alerts
- Export contract data as CSV

### 5. **Alerts Module**
- Report issues during installation/service
- Attach photos as evidence

## ✨ Highlighted Features
- 🔍 **QR Code Scanner** to identify devices quickly
- 👤 **Role-based Access** (Admin, Technician)
- 💾 **localStorage Persistence** (for offline mock data)
- 🌗 **Theme Switcher** (Light/Dark mode toggle)
- 📤 **CSV Export** for reports
- 📱 **Mobile-Responsive Layout**

## 📦 Optional Enhancements
- ✅ QR Code-based device identification
- ✅ Light/Dark mode switcher
- ✅ CSV exports
- ✅ Role-based views
- ✅ Mock API with json-server or localStorage

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/vivekkumar677/medical-device-dashboard.git
cd medical-device-dashboard
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the project
```bash
npm start
```
App will start at: [http://localhost:3000](http://localhost:3000)


## 📁 Folder Structure
```
src/
├── components/        // Shared UI elements
├── context/           // Auth & Theme context providers
├── hooks/             // Custom hooks (e.g., useLocalStorage)
├── pages/             // Page modules (Dashboard, Installation, etc.)
├── redux/             // Redux slices and store setup
└── App.js             // Main App component
```