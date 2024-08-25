const express = require('express');
const router = express.Router();
const {
  createEventType,
  getAllEventTypes,
  getEventTypeById,
  updateEventType,
  deleteEventType,
} = require('../controllers/eventTypeController');

router.post('/', createEventType);
router.get('/', getAllEventTypes);
router.get('/:id', getEventTypeById);
router.put('/:id', updateEventType);
router.delete('/:id', deleteEventType);

module.exports = router;
