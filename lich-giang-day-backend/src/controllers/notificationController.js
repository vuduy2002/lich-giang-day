const cron = require('node-cron');
const sendMail = require('../utils/sendEmail');
const Event = require('../models/Event');
const Lecturer = require('../models/Lecturer');
const Location = require('../models/Location');
const EventType = require('../models/EventType');

const sendDailyNotifications = async () => {
  const newDate = new Date();

  // Format date
  const formattedMonth = newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1;
  const formattedDate = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
  const today = `${newDate.getFullYear()}-${formattedMonth}-${formattedDate}`;
  
  console.log('Checking for events for today:', today);

  const events = await Event.find({ date: today })
    .populate({ path: 'host', model: Lecturer, localField: 'host', foreignField: 'lecturerId', select: 'email -_id' })
    .populate({ path: 'participants', model: Lecturer, localField: 'participants', foreignField: 'lecturerId', select: 'email -_id' })
    .populate({ path: 'eventLocation', model: Location, localField: 'eventLocation', foreignField: 'locationId', select: 'locationName -_id' })
    .populate({ path: 'eventType', model: EventType, localField: 'eventType', foreignField: 'typeId', select: 'typeName -_id' });
  console.log('Events found:', events.length);

  // Create a map to group events by lecturer
  const lecturerEventsMap = new Map();

  events.forEach(event => {
    const addLecturerEvent = (lecturerEmail) => {
      if (!lecturerEventsMap.has(lecturerEmail)) {
        lecturerEventsMap.set(lecturerEmail, []);
      }
      lecturerEventsMap.get(lecturerEmail).push(event);
    };

    // Add host to the lecturerEventsMap
    if (event.host && event.host.email) {
      addLecturerEvent(event.host.email);
    }

    // Add participants to the lecturerEventsMap
    event.participants.forEach(lecturerDetail => {
      addLecturerEvent(lecturerDetail.email);
    });
  });

  // Send emails, avoiding duplicates
  const sentEmails = new Set();

  lecturerEventsMap.forEach((events, email) => {
    if (!sentEmails.has(email)) {
      const emailContent = `

      <h2>Xin chào! Hôm nay bạn sẽ có các sự kiện sau:</h2>
       ${events.map(event =>
           `<h3>-${event.timeStart} - ${event.timeEnd}: ${event?.eventType?.typeName} tại ${event?.eventLocation?.locationName}</h3>`
        )}
      `
      console.log(`Sending email to ${email}`);
      sendMail(email, 'Thông báo sự kiện hàng ngày', emailContent);
      sentEmails.add(email);
    }
  });
};

const dailyNotificationJob = () => {
  // Schedule the cron job to run every day at 6 AM
  // cron.schedule('* * * * *', sendDailyNotifications);
};

module.exports = dailyNotificationJob;
