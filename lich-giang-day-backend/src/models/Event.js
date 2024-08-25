const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventId: { type: String, required: true, unique: true },
  eventName: { type: String, required: true },
  eventDescription: { type: String, required: true },
  date: { type: String, required: true },
  timeStart: { type: String, required: true },
  timeEnd: { type: String, required: true },
  eventLocation: { type: String, required: true, ref: 'Location' },
  eventType: { type: String, required: true, ref: 'EventType' },
  host:[{ type: String, required: true, ref: 'Lecturer' }],
  participants:[{ type: String, required: true, ref: 'Lecturer' }]
});

module.exports = mongoose.model('Event', eventSchema);
