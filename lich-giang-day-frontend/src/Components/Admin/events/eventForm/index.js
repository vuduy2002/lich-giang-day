import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import style from './eventForm.module.scss';
import Button from '../../../Button/Button';
import { getLecturers } from '../../../../services/lectureService';
import { getEventTypes } from '../../../../services/eventTypeService';
import { getLocations } from '../../../../services/locationService';
import {
    createEvent,
    updateEvent,
    getEvents,
} from '../../../../services/eventService';
import { createAttendanceReport, updateAttendanceReport } from '../../../../services/attendanceService';
import Search from '../../events/searchLecturer';
import InputDate from '../../inputDate';

const cx = classNames.bind(style);

const EventForm = ({ children = false, onBack = false, title = false }) => {
   
    const [users, setUsers] = useState([]);
    const [eventTypes, setEventTypes] = useState([]);
    const [eventLocations, setEventLocations] = useState([])
    const [events, setEvents] = useState([]);
    const [errors, setErrors] = useState({});
    const [availableTimes, setAvailableTimes] = useState([]);
    const [host, setHost] = useState([]);
    const [members, setMembers] = useState([]);
    const inputRef = useRef();
    
    const [formData, setFormData] = useState({
        eventId: '',
        eventName: '',
        eventDescription: '',
        date: '',
        timeStart: '',
        timeEnd: '',
        eventLocation: '',
        eventType: '',
        host: [],
        participants: [],
    });

    // show err message
    const [checForcus, setChecForcus] = useState({
        eventId: false,
        eventName: false,
        eventDescription: false,
        divDate: false,
        timeStart: false,
        timeEnd: false,
        eventLocation: false,
        eventType: false,
        divHost: false,
        divParticipants: false,
    });


    // Featch data
    useEffect(() => {
        // Fetch data from API
        const fetchData = async () => {
            // Fetch lecturers from API
            const response1 = await getLecturers();
            setUsers(response1.data);

            // Fetch event types from API
            const response2 = await getEventTypes();
            setEventTypes(response2.data);

            // Fetch events from API
            const response3 = await getEvents();
            setEvents(response3.data);

            // Fetch locations from API
            const response4 = await getLocations();
            setEventLocations(response4.data);
        };

        fetchData();

        if(!children){
            setFormData((pre)=>({...pre, eventId : generateNewEventId() }))
        }
        
        // nếu update -> set data
        if (children) {
            const {__v, _id, ...rest} = children 
            setFormData(rest)
        };
    }, [children]);

    // Fillter ngày dc chọn
    useEffect(() => {
        if (formData.date) {
            let arrEvent = events;
            if (children) {
                const listNoChild = events.filter(
                    (event) => event.id !== children.id,
                );
                arrEvent = listNoChild;
            }
            const filteredEvents = arrEvent.filter(
                (event) => event.date === formData.date,
            );

            const times = filteredEvents.map((event) => ({
                timeStart: event.timeStart,
                timeEnd: event.timeEnd,
            }));
            setAvailableTimes(times);
        }
    }, [formData.date, events, children]);

    // check and Set form data
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const user = users.find((user) => user.lecturerId === value);

        // check chọn thành viên
        if (type === 'checkbox') {
            const updatedArray = checked
                ? [
                      ...formData[name],
                      {
                          lecturerId: user.lecturerId,
                          lecturerName: user.lecturerName,
                      },
                  ] // tick chon
                : formData[name].filter((item) => item.lecturerId !== value); // bỏ tick chọn
            setFormData({
                ...formData,
                [name]: updatedArray,
            });
        }
        else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    // Validate form data
    const validateForm = () => {
        const newErrors = {};
        if (!formData.eventName)
            newErrors.eventName = 'Vui lòng nhập tên sự kiện';
        if (!formData.eventDescription)
            newErrors.eventDescription = 'Vui lòng nhập mô tả';
        if (!formData.date) newErrors.date = 'Vui lòng chọn ngày';
        if (!formData.timeStart)
            newErrors.timeStart = 'Vui lòng nhập thời gian bắt đầu';
        if (!formData.timeEnd)
            newErrors.timeEnd = 'Vui lòng nhập thời gian kết thúc';
        if (formData.timeEnd < formData.timeStart)
            newErrors.timeEnd = 'Thời gian kết thúc không phù';
        if (!formData.eventLocation)
            newErrors.eventLocation = 'Vui chọn nhập địa điểm';
        if (!formData.eventType)
            newErrors.eventType = 'Vui lòng chọn loại sự kiện';
        if (formData.host.length === 0)
            newErrors.host = 'Vui lòng chọn ít nhất một người chủ trì';
        if (formData.participants.length === 0)
            newErrors.participants =
                'Vui lòng chọn ít nhất một thành viên tham gia';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // check conflic time
    const alerConflicTime = ()=>{
        if (formData.date) {
            const isConflict = availableTimes.some(
                (time) =>
                    (formData.timeStart >= time.timeStart &&
                        formData.timeStart < time.timeEnd) ||
                    (formData.timeEnd > time.timeStart &&
                        formData.timeEnd <= time.timeEnd) ||
                    (formData.timeStart <= time.timeStart &&
                        formData.timeEnd >= time.timeEnd),
            );
            if (isConflict)
                alert(`Lưu ý: Thời gian sự kiện bị trùng !`);
        }
    }

    // obj lecture -> arr lecturerId
    const getLecturerIds = (arr) => {
        return arr.map((item) => {
            return item.lecturerId;
        });
    };

    // Transform members to unique array
    const idToObReport = (arrOb) => {
        const uniqueLecturers = [];
        const lecturerIds = new Set();
        arrOb.forEach((item) => {
            if (!lecturerIds.has(item.lecturerId)) {
                lecturerIds.add(item.lecturerId);
                uniqueLecturers.push({
                    lecturerId: item.lecturerId,
                    confirm: 'chưa phản hồi!',
                    reason: ''
                });
            }
        });
        return uniqueLecturers;
    };

    // submit
    const handleSubmit = (e) => {
        e.preventDefault();
        
        //format lại các trường trước khi đâyr lên data base
        let newData = {};
        let attendanceData = {};
        //
        if (validateForm()) {
            if (children) {
                newData = {
                    ...formData,
                    eventLocation: formData.eventLocation.locationId? formData.eventLocation.locationId: formData.eventLocation,
                    eventType: formData.eventType.typeId? formData.eventType.typeId: formData.eventType,
                    host: getLecturerIds(formData.host),
                    participants: getLecturerIds(formData.participants),
                };
                attendanceData = {
                    eventId: newData.eventId,
                    lecturers: idToObReport([...formData.host,...formData.participants])
                }
                // update to database
                const handleUpdate = async () => {
                    await updateEvent(children.eventId, newData);
                    await updateAttendanceReport(children.eventId, attendanceData);
                };
                handleUpdate();
                alert('Cập nhật thành công!');
                onBack(false);
            } else {
                newData = {
                    ...formData, 
                    eventType: formData.eventType,
                    host: getLecturerIds(formData.host),
                    participants: getLecturerIds(formData.participants),
                };
                
                //create 
                attendanceData = {
                    eventId: newData.eventId,
                    lecturers: idToObReport([...formData.host,...formData.participants])
                }
                
                
                // create to database
                
                const handleCreate = async () => {
                    await createEvent(newData);
                    await createAttendanceReport(attendanceData);
                };
                handleCreate();

                alert('Tạo thành công!');
                //reset form
                setFormData({
                    eventId: generateNewEventId(),
                    eventName: '',
                    eventDescription: '',
                    date: '',
                    timeStart: '',
                    timeEnd: '',
                    eventLocation: '',
                    eventType: '',
                    host: [],
                    participants: [],     
                });

                setErrors({});
                setAvailableTimes([]);

                //auto forcus
                inputRef.current.focus();
            }
        }
    };

    // Lấy name render ra input aria
    useEffect(() => {
        setHost(formData.host.map((user) => user.lecturerName));
    }, [formData.host]);
    useEffect(() => {
        setMembers(formData.participants.map((user) => user.lecturerName));
    }, [formData.participants]);

    // Create rendom eventId
    const generateNewEventId = () => {
        let newId = '';
        let arrId = events.map(event => event.eventId);
        do {
            const randomNum = Math.floor(1000 + Math.random() * 9000);
            newId = `EV${randomNum}`;
        } while (arrId.includes(newId));
        return newId;
    };

    // vallidte err notifications
    const checkNotificationsErr =  {
        whenForcus : (e) => {
            const {name}= e.target
            setChecForcus((pre)=>({...pre, [name]:true}));
        },
        whenBlur : (e) => {
            const {name,type, value}= e.target
            setChecForcus((pre)=>({...pre, [name]:false}));
            if(Object.keys(errors).length>0){
                validateForm()
            }
            if(name === 'timeEnd'){
                alerConflicTime()
            }
            
              //check ko chọn ngày giờ quá khứ
            if(type === 'time'){  
                if (formData.date === new Date().toISOString().split('T')[0]) {
                    const currentTime = new Date().toTimeString().split(' ')[0].slice(0, 5); // Lấy thời gian hiện tại trong định dạng 24 giờ, chỉ lấy phần giờ và phút
 
                    if (value < currentTime) {
                        alert('Thời gian không được nhỏ hơn thời gian hiện tại');
                        setFormData({
                            ...formData,
                            [name]: '',
                        });
                        return;
                    }
                }
            }
        }
}

    return (
        <div className={cx('container')}>
            {onBack && (
                <Button
                    leftIcon={<FontAwesomeIcon icon={faChevronLeft} />}
                    onClick={() => {
                        onBack(false);
                    }}
                >
                    Quay lại
                </Button>
            )}

            <h2 className={cx('title')}>{title}</h2>
            <form onSubmit={handleSubmit} className={cx('form')}>
                <label className={cx('label')}>
                    ID sự kiện:
                    <input
                        className={cx('input')}
                        type="text"
                        name="eventId"
                        placeholder="! Chọn loại sự kiện sẽ tự tạo Id ! "
                        disabled
                        value={formData.eventId}
                        onChange={handleChange}
                    />
                </label>

                <label className={cx('label')}>
                    Loại sự kiện:
                    <select
                        className={cx('select')}
                        name="eventType"
                        value={formData.eventType?.typeId || formData.eventType  || '' }
                        onChange={handleChange}
                        onFocus={(e)=>checkNotificationsErr.whenForcus(e)}
                        onBlur={(e)=>checkNotificationsErr.whenBlur(e)}
                    >
                        <option value="">Chọn loại sự kiện</option>
                        {eventTypes.map((type) => (
                            <option key={type.typeId} value={type.typeId}>
                                {type.typeName}
                            </option>
                        ))}
                    </select>
                    {!checForcus.eventType && errors.eventType && (
                        <span className={cx('error')}>{errors.eventType}</span>
                    )}
                </label>

                <label className={cx('label')}>
                    Tên sự kiện:
                    <input
                        className={cx('input')}
                        type="text"
                        name="eventName"
                        value={formData.eventName}
                        ref={inputRef}
                        onChange={handleChange}
                        onFocus={(e)=>checkNotificationsErr.whenForcus(e)}
                        onBlur={(e)=>checkNotificationsErr.whenBlur(e)}
                    />
                    {!checForcus.eventName && errors.eventName && (
                        <span className={cx('error')}>{errors.eventName}</span>
                    )}
                </label>

                <label className={cx('label')}>
                    Mô tả:
                    <textarea
                        className={cx('textarea')}
                        name="eventDescription"
                        value={formData.eventDescription}
                        onChange={handleChange}
                        onFocus={(e)=>checkNotificationsErr.whenForcus(e)}
                        onBlur={(e)=>checkNotificationsErr.whenBlur(e)}
                    ></textarea>
                    {!checForcus.eventDescription && errors.eventDescription && (
                        <span className={cx('error')}>
                            {errors.eventDescription}
                        </span>
                    )}
                </label>

                <fieldset className={cx('fieldset')}>
                    <legend className={cx('legend')}>Người chủ trì:</legend>
                    <div className={cx('boxSearch')}
                        name='divHost'
                        onFocus={checkNotificationsErr.whenForcus}
                        onBlur={checkNotificationsErr.whenBlur}>
                        <textarea
                            className={cx('textareaSearch')}
                            value={host}
                            disabled
                        ></textarea>
                        <Search
                            className={cx('search')}
                            arrData={users}
                            formData={formData.host}
                            name="host"
                            handleChange={handleChange}            
                        />
                    </div>

                    {!checForcus.divHost && errors.host && (
                        <span className={cx('error')}>{errors.host}</span>
                    )}
                </fieldset>

                <fieldset className={cx('fieldset')}>
                    <legend className={cx('legend')}>
                        Thành viên tham gia:
                    </legend>
                    <div className={cx('boxSearch')}
                        name='divParticipants'
                        onFocus={checkNotificationsErr.whenForcus}
                        onBlur={checkNotificationsErr.whenBlur}>
                        <textarea
                            className={cx('textareaSearch')}
                            value={members}
                            disabled
                        ></textarea>
                        <Search
                            className={cx('search')}
                            arrData={users}
                            formData={formData.participants}
                            name="participants"
                            handleChange={handleChange}
                        />
                    </div>

                    {!checForcus.divParticipants && errors.participants && (
                        <span className={cx('error')}>
                            {errors.participants}
                        </span>
                    )}
                </fieldset>

                <label className={cx('label')}>
                    Ngày:
                   <div 
                   name='divDate'
                   onFocus={(e)=>checkNotificationsErr.whenForcus(e)}
                   onBlur={(e)=>checkNotificationsErr.whenBlur(e)}>
                        <InputDate 
                            dateValue={formData.date}
                            className={cx('input')}
                            setFormData={setFormData}
                            offset={[0,-20]}
                            // tileDisabled
                        />
                   </div>
                     {!checForcus.divDate && errors.date && (
                        <span className={cx('error')}>{errors.date}</span>
                    )}
                </label>

                {availableTimes.length > 0 && (
                    <label >
                        <p style={{color:'red'}}>Các khung giờ đã có lịch:</p>{' '}
                        <ul className={cx('duplicateTime')}>
                            {availableTimes.map((time, index) => {
                                return (
                                    <li key={index}>
                                        {time.timeStart} - {time.timeEnd}
                                    </li>
                                );
                            })}
                        </ul>
                    </label>
                )}
                <label className={cx('label')}>
                    Thời gian bắt đầu:
                    <input
                        className={cx('input')}
                        type="time"
                        name="timeStart"
                        value={formData.timeStart}
                        onChange={handleChange}
                        onFocus={(e)=>checkNotificationsErr.whenForcus(e)}
                        onBlur={(e)=>checkNotificationsErr.whenBlur(e)}
                    />
                    {!checForcus.timeStart && errors.timeStart && (
                        <span className={cx('error')}>{errors.timeStart}</span>
                    )}
                </label>
                <label className={cx('label')}>
                    Thời gian kết thúc:
                    <input
                        className={cx('input')}
                        type="time"
                        name="timeEnd"
                        value={formData.timeEnd}
                        onChange={handleChange}
                        onBlur={(e)=>{ checkNotificationsErr.whenBlur(e)}}
                        onFocus={(e)=>checkNotificationsErr.whenForcus(e)}
                    />
                    {!checForcus.timeEnd && errors.timeEnd && (
                        <span className={cx('error')}>{errors.timeEnd}</span>
                    )}
                </label>

                <label className={cx('label')}>
                    Địa điểm:
                    <select
                        className={cx('select')}
                        name="eventLocation"
                        value={formData.eventLocation?.locationId || formData.eventLocation || ''}
                        onChange={handleChange}
                        onBlur={(e)=>{ checkNotificationsErr.whenBlur(e)}}
                        onFocus={(e)=>checkNotificationsErr.whenForcus(e)}
                    >
                        <option value="">Chọn địa điểm</option>
                        {eventLocations.map((location) => (
                            <option key={location.locationId} value={location.locationId}>
                                {location.locationName}
                            </option>
                        ))}
                    </select>
                    {!checForcus.eventLocation && errors.eventLocation && (
                        <span className={cx('error')}>{errors.eventLocation}</span>
                    )}
                </label>

                <Button primary onClick={handleSubmit}>
                    {title}
                </Button>
            </form>
        </div>
    );
};

export default EventForm;
