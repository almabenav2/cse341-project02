const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Import models
const Artist = require('./models/artistModel');
const Song = require('./models/songModel');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB using environment variable
const MONGODB_URI = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});
app.use ('/', require('./routes'));

// Routes
const artistRoutes = require('./routes/artistRoutes');
const songRoutes = require('./routes/songRoutes');

app.use('/artists', artistRoutes);
app.use('/songs', songRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});