const Attendance = require('../models/Attendance');

const createAttendance = async (req, res) => {
  const attendance = new Attendance(req.body);
  try {
    const savedAttendance = await attendance.save();
    res.status(201).json(savedAttendance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.find();
    res.json(attendances);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findOne({ eventId: req.params.eventId});
    if (!attendance) return res.status(404).json({ message: 'Attendance not found' });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateAttendance = async (req, res) => {
  try {
    const updatedAttendance = await Attendance.findOneAndUpdate(
      { eventId: req.params.eventId},
      req.body,
      { new: true }
    );
    if (!updatedAttendance) return res.status(404).json({ message: 'Attendance not found' });
    res.json(updatedAttendance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteAttendance = async (req, res) => {
  try {
    const deletedAttendance = await Attendance.findOneAndDelete({ eventId: req.params.eventId});
    if (!deletedAttendance) return res.status(404).json({ message: 'Attendance not found' });
    res.json({ message: 'Attendance deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createAttendance,
  getAllAttendances,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
};
