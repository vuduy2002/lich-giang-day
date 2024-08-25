// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const dailyNotificationJob = require('./controllers/notificationController');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Import routes
const attendanceRoutes = require('./routes/attendance');
const eventRoutes = require('./routes/event');
const eventTypeRoutes = require('./routes/eventType');
const lecturerRoutes = require('./routes/lecturer');
const resetPass = require('./routes/resetPass');
const locationRoutes = require('./routes/location');

// Use routes
app.use('/api/attendances', attendanceRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/eventTypes', eventTypeRoutes);
app.use('/api/lecturers', lecturerRoutes);
app.use('/api/', resetPass);
app.use('/api/locations', locationRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    dailyNotificationJob();
  });
}).catch(err => {
  console.error('Connection error', err.message);
});
