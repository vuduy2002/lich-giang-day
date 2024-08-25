// LecturerEvent.jsx
import React, { useEffect, useState } from 'react';
import CalendarComponent from '../Calender';
import { getEvents } from '../../../services/eventService';

function LecturerEvent() {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = atob(user.tokenID);

    // Get all events
    useEffect(() => {
        const fetchEvents = async () => {
            const response = await getEvents();
            setEvents(response.data);
        };
        fetchEvents();
    }, []);

    // Filter user's events
    useEffect(() => {
        const eventOfUser = events.filter(
            (event) =>
                event.host.some((host) => host.lecturerId === userId) ||
                event.participants.some(
                    (participant) => participant.lecturerId === userId,
                ),
        );
        setFilteredEvents(eventOfUser);
    }, [events, userId]);

    return <CalendarComponent curUser={userId} events={filteredEvents} />;
}

export default LecturerEvent;
