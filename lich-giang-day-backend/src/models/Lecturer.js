const mongoose = require('mongoose');

const lecturerSchema = new mongoose.Schema({
  lecturerId: { type: String, required: true, unique: true },
  lecturerName: { type: String, required: true },
  lecturerPhone: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
  avatar: { type: String },
  position: { type: String, required: true }
});

module.exports = mongoose.model('Lecturer', lecturerSchema);
