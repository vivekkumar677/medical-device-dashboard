# Medical Device Dashboard

A responsive React-based admin panel to manage medical device inventories, installation logs, service visits, AMC/CMC contracts, alerts, and CRM data across medical facilities.

---

## 🛠 Tech Stack
- **ReactJS** + **Redux** for frontend state management
- **Material UI** + **SCSS Modules** for styling
- **React Router DOM** for routing
- **QR Code Scanner** (via `react-qr-reader`)
- **CSV Export** (via `react-csv`)
- **Mock API** using `json-server` or **localStorage** for persistence

---

## ✅ Core Module Features

### 1. Device Inventory Dashboard
- View device ID, type, facility, status, battery level, last service date, AMC/CMC status
- Export device data to CSV
- Role-based views: Admin gets full CRUD; Technician has read-only access

### 2. Installation & Training Module
- Add installation logs with device checklist, facility info, trainer info, feedback notes
- Upload unboxing photos
- QR Code Scanner auto-fills Device ID
- Track installation completion status
- Edit and delete entries with localStorage persistence

### 3. Service Visit Logs Module
- Log preventive and breakdown service visits
- Capture engineer details, visit purpose, notes
- Upload photos or PDFs as proof
- Full CRUD with edit and delete support

### 4. AMC/CMC Tracker Module
- Track AMC/CMC contract start/end dates and status
- Highlight upcoming contract expiries (within 30 days)
- Add and edit contracts with status display
- Export contracts data to CSV

### 5. Alerts & Photo Logs Module
- Report device alerts and issues
- Require photo upload for submission validation
- View submitted alerts with photo previews
- Delete alerts with confirmation

---

## ✨ Highlighted Features
- 🔍 QR Code Scanner for quick device identification
- 👤 Role-based views (Admin vs Technician)
- 💾 Local storage for offline mock data persistence (applied in device & installation modules; can be extended)
- 🌗 Theme switcher for light/dark mode
- 📤 CSV export for device and contract data
- 📱 Fully mobile-responsive UI design

---

## 🚧 Known Issues & TODO
- Extend localStorage persistence to all modules (currently only device and installation modules persist)
- Role-based views for modules beyond device page (technician view restricted properly)
- Backend API consistency fixes: Ensure `last_service` and `amc_status` update correctly in database with matching property names
- Improve file upload UI & validation for service visits and alerts

---

## 🚀 Getting Started

### 1. Clone the repository
``` bash
git clone https://github.com/vivekkumar677/medical-device-dashboard.git
cd medical-device-dashboard


### 2. Install dependencies
npm install


### 3. Run the project
```bash
npm start
```
App will start at: [http://localhost:3000]

Run backend server (Node.js + Express)
node server.js
(http://localhost:5000)


## 📁 Folder Structure
src/
├── components/        // Shared UI components (buttons, inputs, cards, etc.)
├── context/           // React Context providers (Auth, Theme)
├── hooks/             // Custom hooks (e.g., useLocalStorage)
├── utils/             // storing and retrieving data from Local Storage
├── pages/             // Pages like Dashboard, Installation, Service Logs, AMC Tracker, Alerts
├── redux/             // Redux slices & store configuration
└── App.js             // Main app entry point with routing
server/
└── server.js          // Express backend server with REST API routes

Developed by Vivek Kumar

---

If you want, I can prepare this as a downloadable `.md` file for you too!
