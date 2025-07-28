const Pool = require('pg').Pool

const pool = new Pool({
    // user: 'postgres',
    // host: 'localhost',
    // database: 'medical_device_dashboard',
    // password: 'user',
    // port: 5432
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false

});

module.exports = pool;