const express = require('express');
const router = express.Router();
const {
  createLecturer,
  getAllLecturers,
  getLecturerById,
  updateLecturer,
  deleteLecturer,
} = require('../controllers/lecturerController');

router.post('/', createLecturer);
router.get('/', getAllLecturers);
router.get('/:id', getLecturerById);
router.put('/:id', updateLecturer);
router.delete('/:id', deleteLecturer);

module.exports = router;
