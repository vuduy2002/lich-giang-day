const express = require('express');
const router = express.Router();
const {
  createAttendance,
  getAllAttendances,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
} = require('../controllers/attendanceController');

router.post('/', createAttendance);
router.get('/', getAllAttendances);
router.get('/:eventId', getAttendanceById);
router.put('/:eventId', updateAttendance);
router.delete('/:eventId', deleteAttendance);

module.exports = router;
