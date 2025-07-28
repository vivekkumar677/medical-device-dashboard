const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'medical_device_dashboard',
    password: 'user',
    port: 5432
});

module.exports = pool;