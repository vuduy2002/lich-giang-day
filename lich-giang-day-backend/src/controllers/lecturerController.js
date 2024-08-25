const Lecturer = require('../models/Lecturer');

const createLecturer = async (req, res) => {
  const lecturer = new Lecturer(req.body);
  try {
    const savedLecturer = await lecturer.save();
    res.status(201).json(savedLecturer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllLecturers = async (req, res) => {
  try {
    const lecturers = await Lecturer.find();
    res.json(lecturers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getLecturerById = async (req, res) => {
  try {
    const lecturer = await Lecturer.findOne({ lecturerId: req.params.id });
    if (!lecturer) return res.status(404).json({ message: 'Lecturer not found' });
    res.json(lecturer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateLecturer = async (req, res) => {
  try {
    const updatedLecturer = await Lecturer.findOneAndUpdate({ lecturerId: req.params.id }, req.body, { new: true });
    if (!updatedLecturer) return res.status(404).json({ message: 'Lecturer not found' });
    res.json(updatedLecturer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteLecturer = async (req, res) => {
  try {
    const deletedLecturer = await Lecturer.findOneAndDelete({ lecturerId: req.params.id });
    if (!deletedLecturer) return res.status(404).json({ message: 'Lecturer not found' });
    res.json({ message: 'Lecturer deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createLecturer,
  getAllLecturers,
  getLecturerById,
  updateLecturer,
  deleteLecturer,
};
