const express = require('express');
const router = express.Router();
const health = require('../health/health');

router.get('/', health.healthStatus);

module.exports = router;