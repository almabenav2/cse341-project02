const express = require('express');
const bodyParser = require('body-parser');
const { initDb, getDatabase } = require('./data/database');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB using environment variable
initDb((err) => {
    if (err) {
        console.error('Error initializing database:', err);
        process.exit(1); // Exit the application if database initialization fails
    }

    // Middleware
    app.use(bodyParser.json());
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
        );
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    });

    // Routes
    app.use('/', require('./routes'));
    const artistRoutes = require('./routes/artistRoutes');
    const songRoutes = require('./routes/songRoutes');
    app.use('/artists', artistRoutes);
    app.use('/songs', songRoutes);

    // Catch 404 errors
    app.use((req, res, next) => {
        res.status(404).json({ error: 'Not Found' });
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    });

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
