const EventType = require('../models/EventType');

const createEventType = async (req, res) => {
  const eventType = new EventType(req.body);
  try {
    const savedEventType = await eventType.save();
    res.status(201).json(savedEventType);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllEventTypes = async (req, res) => {
  try {
    const eventTypes = await EventType.find();
    res.json(eventTypes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEventTypeById = async (req, res) => {
  try {
    const eventType = await EventType.findOne({ typeId: req.params.id });
    if (!eventType) return res.status(404).json({ message: 'EventType not found' });
    res.json(eventType);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateEventType = async (req, res) => {
  try {
    const updatedEventType = await EventType.findOneAndUpdate({ typeId: req.params.id }, req.body, { new: true });
    if (!updatedEventType) return res.status(404).json({ message: 'EventType not found' });
    res.json(updatedEventType);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteEventType = async (req, res) => {
  try {
    const deletedEventType = await EventType.findOneAndDelete({ typeId: req.params.id });
    if (!deletedEventType) return res.status(404).json({ message: 'EventType not found' });
    res.json({ message: 'EventType deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createEventType,
  getAllEventTypes,
  getEventTypeById,
  updateEventType,
  deleteEventType,
};
