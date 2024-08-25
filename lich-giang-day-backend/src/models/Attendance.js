const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  eventId: { type: String, required: true, unique: true },
  lecturers: { type: Array, required: true, },
});

module.exports = mongoose.model('Attendance', attendanceSchema);
