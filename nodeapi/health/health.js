const { poolPromise } = require('../connections/db');

const healthStatus = async (req, res) => {
    const healthStatus = {
        status: 'UP',
        checks: {
            database: 'PENDING',
        },
        timestamp: new Date().toISOString(),
    };

    try {
        // Check database connection
        const pool = await poolPromise;
        await pool.request().query('SELECT 1'); // Simple query to ensure the DB is up
        healthStatus.checks.database = 'UP';
    } catch (err) {
        healthStatus.checks.database = 'DOWN';
        healthStatus.status = 'DOWN';
    }

    const statusCode = healthStatus.status === 'UP' ? 200 : 503; // 503 = Service Unavailable
    res.status(statusCode).json(healthStatus);
};

module.exports = {healthStatus};