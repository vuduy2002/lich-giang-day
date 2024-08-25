const Event = require('../models/Event');
const EventType = require('../models/EventType');
const Lecturer = require('../models/Lecturer');
const Location = require('../models/Location');


const createEvent = async (req, res) => {
  const event = new Event(req.body);
  try {
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate({ path: 'eventLocation', model: Location, localField: 'eventLocation', foreignField: 'locationId', select: 'locationName -_id' })
      .populate({ path: 'eventType', model: EventType, localField: 'eventType', foreignField: 'typeId', select: 'typeName -_id' })
      .populate({ path: 'host', model: Lecturer, localField: 'host', foreignField: 'lecturerId', select: 'lecturerName -_id' })
      .populate({ path: 'participants', model: Lecturer, localField: 'participants', foreignField: 'lecturerId', select: 'lecturerName -_id' });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findOne({ eventId: req.params.id })
      .populate({ path: 'eventLocation', model: Location, localField: 'eventLocation', foreignField: 'locationId', select: 'locationName -_id' })
      .populate({ path: 'eventType', model: EventType, localField: 'eventType', foreignField: 'typeId', select: 'typeName -_id' })
      .populate({ path: 'host', model: Lecturer, localField: 'host', foreignField: 'lecturerId', select: 'lecturerName -_id' })
      .populate({ path: 'participants', model: Lecturer, localField: 'participants', foreignField: 'lecturerId', select: 'lecturerName -_id' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findOneAndUpdate(
      { eventId: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findOneAndDelete({ eventId: req.params.id });
    if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
