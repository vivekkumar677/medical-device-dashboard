CREATE DATABASE medical_device_dashboard;

CREATE Table devices (
    device_id VARCHAR PRIMARY KEY,
    type TEXT,
    facility TEXT,
    status TEXT,
    battery INTEGER,
    last_service TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amc_status TEXT
);

INSERT INTO devices (
    device_id,
    type,
    facility,
    status,
    battery,
    last_service,
    amc_status
) VALUES ('MED-001', 'ECG Machine', 'Apollo Hospital', 'Active', 80, '2023-08-25 10:30:00', 'Good'),
  ('MED-002', 'X-Ray Unit', 'Fortis Clinic', 'Inactive', 50, '2023-08-26 14:45:00', 'Needs Repair'),
  ('MED-003', 'Blood Pressure Monitor', 'Sunrise Clinic', 'Active', 100, '2023-08-27 09:15:00', 'Good'),
  ('MED-004', 'Respiratory Monitor', 'Apollo Hospital', 'Active', 90, '2023-08-28 11:00:00', 'Good'),
  ('MED-005', 'Thermometer', 'Sunrise Clinic', 'Inactive', 70, '2023-08-29 15:30:00', 'Needs Repair'),
  ('MED-006', 'Oxygen Concentrator', 'Fortis Clinic', 'Active', 95, '2023-08-30 13:45:00', 'Good'),
  ('MED-007', 'ECG Machine', 'Apollo Hospital', 'Active', 80, '2023-08-31 10:30:00', 'Good'),
  ('MED-008', 'X-Ray Unit', 'Fortis Clinic', 'Inactive', 50, '2023-09-01 14:45:00', 'Needs Repair'),
  ('MED-009', 'Blood Pressure Monitor', 'Sunrise Clinic', 'Active', 100, '2023-09-02 09:15:00', 'Good'),
  ('MED-010', 'Respiratory Monitor', 'Apollo Hospital', 'Active', 90, '2023-09-03 11:00:00', 'Good');