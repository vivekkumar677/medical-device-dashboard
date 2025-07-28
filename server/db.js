const Pool = require('pg').Pool

const pool = new Pool({
    // user: 'postgres',
    // host: 'localhost',
    // database: 'medical_device_dashboard',
    // password: 'user',
    // port: 5432

    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false

});

module.exports = pool;