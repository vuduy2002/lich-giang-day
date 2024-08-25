const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Attendance = require('../models/Attendance');

// Lấy các trường yêu cầu
router.get('/events/custom', async (req, res) => {
    try {
        const events = await Event.find()
            .populate('eventType')
            .populate('host');

        const results = await Promise.all(events.map(async (event) => {
            const participants = await Attendance.find({ eventId: event._id }).populate('lecturerId');
            const participantNames = participants.map(participant => participant.lecturerId.lecturerName);

            return {
                id: event._id,
                eventName: event.eventName,
                eventDescription: event.eventDescription,
                date: event.date,
                timeStart: event.timeStart,
                timeEnd: event.timeEnd,
                eventLocation: event.eventLocation,
                eventType: event.eventType ? event.eventType.typeName : null,
                hostName: event.host ? event.host.lecturerName : null,
                participants: participantNames
            };
        }));

        res.send(results);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while fetching data.' });
    }
});

module.exports = router;
