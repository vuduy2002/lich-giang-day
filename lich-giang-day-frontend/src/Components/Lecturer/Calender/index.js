import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faClock } from '@fortawesome/free-solid-svg-icons';

import style from './Calender.module.scss';
import FormShowEvent from '../../Lecturer/formShowEvent';
import Popper from '../../Popper/Popper';

const cx = classNames.bind(style);

const CalendarComponent = ({ events, curUser }) => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [dayEvents, setDayEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const onChange = (date) => {
        setDate(date);
    };

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const today = new Date();
            const dayHasEvents = events.some(
                (event) =>
                    event.date &&
                    new Date(event.date).toDateString() === date.toDateString(),
            );

            if (dayHasEvents) {
                const isPastDate = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                return (
                    <div>
                        <FontAwesomeIcon
                            icon={faBell}
                            style={{ color: isPastDate ? 'gray' : 'red' }}
                        />
                    </div>
                );
            }
        }
        return null;
    };

    const handleDayClick = (date) => {
        const eventsOfDay = events.filter(
            (event) =>
                event.date &&
                new Date(event.date).toDateString() === date.toDateString(),
        );
        setDayEvents(eventsOfDay);
        setShow(true);
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
    };

    const handleClose = () => {
        setSelectedEvent(null);
    };

    return (
        <div className={cx('wrapper')}>
            <Calendar
                className={cx('calendar')}
                onChange={onChange}
                value={date}
                tileContent={tileContent}
                onClickDay={handleDayClick}
            />
            {show && dayEvents.length > 0 && (
                <Popper bold>
                    <div className={cx('events-wrapper')}>
                        {dayEvents.map((event) => (
                            <div
                                key={event.eventId}
                                className={cx('event-detail')}
                                onClick={() => handleEventClick(event)}
                            >
                                <h3>{event.eventName}</h3>       
                                <FontAwesomeIcon icon={faClock} style={{color: "gray"}}/>
                                {` ${event.timeStart} - ${event.timeEnd}`}                             
                            </div>
                        ))}
                    </div>
                </Popper>
            )}

            {selectedEvent && (
                <FormShowEvent curUser={curUser} event={selectedEvent} onClose={handleClose} />
            )}
        </div>
    );
};

export default CalendarComponent;
