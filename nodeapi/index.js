const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const healthRoutes = require('./routes/healthRoutes');

//create app
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/health',healthRoutes)

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
