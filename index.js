  require('dotenv').config();
  const express = require('express');
  const mongoose = require('mongoose');
  const cors = require('cors');

  // Initialize App
  const app = express();
  const PORT = process.env.PORT || 5000;

  // Middleware   
  app.use(cors());
  app.use(express.json());

  // Database Connection
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('MongoDB Connection Error:', err));

  // Route Imports
  const seedRoute = require('./routes/seed');
  const questionsRoute = require('./routes/questions');
  const assessRoute = require('./routes/assess');
  const authRoute = require('./routes/auth');

  // Use Routes
  app.use('/api/seed', seedRoute);
  app.use('/api/questions', questionsRoute);
  app.use('/api/assess', assessRoute);
  app.use('/api/auth', authRoute);  
  
  // Base Route
  app.get('/', (req, res) => {
    res.send('CyberGuard Backend is Running');
  });

  // Start Server
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });