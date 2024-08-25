import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { getEvents, deleteEvent } from '../../../../services/eventService';
import { deleteAttendanceReport } from '../../../../services/attendanceService';
import { getEventTypes } from '../../../../services/eventTypeService';
import style from './listEvents.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faFileAlt, faBomb, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import EventForm from '../eventForm';
import {convertFromYYYYMMDD} from '../../../formatDate'
import { Link } from 'react-router-dom';
import InputDate from '../../inputDate';
import FormShowEvent from '../../../Lecturer/formShowEvent';
import Button from '../../../Button';

const cx = classNames.bind(style);

const ListEventsAdmin = () => {
    const [events, setEvents] = useState([]);
    const [eventTypes, setEventTypes] = useState([]);
    const [choseEventType, setChoseEventType] = useState('');
    const [checkUpdate, setCheckUpdate] = useState(false);
    const [detailEvent, setDetailEvent] = useState();
    const [currentEvent, setCurrentEvent] = useState({});
    const [inputValue, setInputValue] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            const response1 = await getEvents();
            setEvents(response1.data);
            const response2 = await getEventTypes();
            setEventTypes(response2.data);
        };
        fetchEvents();
    }, [checkUpdate]);

    //icon delete
    const handleDelete = async (event) => {
        if (
            window.confirm(
                `Bạn muốn xóa sự kiện có id : ${event.eventId} : ${event.eventName}`
            ) === true
        ) {
            await deleteEvent(event.eventId);
            await deleteAttendanceReport(event.eventId);
            const response = await getEvents();
            setEvents(response.data);
        }
    };

    // icon update
    const handleEdit = (event) => {
        setCheckUpdate(true);
        setCurrentEvent(event);
    };

    //check search: enddate < startdate
    if (startDate.date || endDate.date) {
        if (new Date(startDate.date) > new Date(endDate.date)) {
            alert('ngày kết thúc không được lớn hơn ngày bắt đầu');
            setEndDate(startDate);
        }
    }

    // lọc events
    const filteredEvents = events.filter((event) => {
        const id = event.eventId?.toLowerCase() || '';
        const name = event.eventName?.toLowerCase() || '';
        const type = event?.eventType?.typeId;
        const query = inputValue.toLowerCase();
        const eventDate = new Date(event.date);
        const validStartDate = startDate ? new Date(startDate.date) : null;
        const validEndDate = endDate ? new Date(endDate.date) : null;

        const isAfterStartDate = !validStartDate || eventDate >= validStartDate;
        const isBeforeEndDate = !validEndDate || eventDate <= validEndDate;

        return (
            (id.includes(query) ||
            name.includes(query)) &&
            (choseEventType === '' || type === choseEventType) &&
            isAfterStartDate &&
            isBeforeEndDate
        );
    });

    // check date to show report
    const isPastEvent = (eventDate) => {
        const currentDate = new Date();
        return new Date(eventDate) < currentDate.setHours(0,0,0,0);
    };

    // show details of the event
    const showForm = (event) => {
        setDetailEvent(event);
    };

    return checkUpdate ? (
        <EventForm title={'Cập nhật Sự kiện'} onBack={setCheckUpdate}>
            {currentEvent}
        </EventForm>
    ) : (
        <div>
            <div className={cx('container')}>
                <Button outline size="S" onClick={() => window.history.back()}><FontAwesomeIcon icon={faChevronLeft}/>Quay lại</Button>
                <h1 className={cx('title')}>Danh Sách Sự Kiện</h1>
    
                <div className={cx('box-search')}>
                    <input
                        type="text"
                        placeholder="Nhập tên sự kiện..."
                        className={cx('input')}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    ></input>

                    <select
                        className={cx('input')}
                        name="eventType"
                        value={choseEventType}
                        onChange={(e) => setChoseEventType(e.target.value)}
                    >
                        <option value="">Chọn loại sự kiện</option>
                        {eventTypes.map((type) => (
                            <option key={type.typeId} value={type.typeId}>
                                {type.typeName}
                            </option>
                        ))}
                    </select>
    
                    <div className={cx('box-date-input')}>
                        <p>
                            Từ: 
                        </p>
                        <InputDate 
                            dateValue={startDate.date}
                            className={cx('input')}
                            setFormData={setStartDate}
                            offset={[0,0]}
                        />
                        <p>
                            đến: 
                        </p>
                        <InputDate 
                            dateValue={endDate.date}
                            className={cx('input')}
                            setFormData={setEndDate}
                            offset={[-180,0]}
                        />
                    </div>
                </div>
    
                <div className={cx('boxTable')}>
                    <table className={cx('table')}>
                        <thead className={cx('thead')}>
                            <tr>
                                <th>Id</th>
                                <th>Loại sự kiện</th>
                                <th>Tên sự kiện</th>
                                <th>Ngày</th>
                                <th>Thời gian bắt đầu</th>
                                <th>Thời gian kết thúc</th>
                                <th>Địa điểm</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody className={cx('tbody')}>
                            {filteredEvents.length > 0 ? (
                                filteredEvents.map((event) => (
                                    <tr key={event.eventId} onClick={() => showForm(event)}>
                                        <td>{event.eventId}</td>
                                        <td>{event.eventType?.typeName || <FontAwesomeIcon icon={faBomb} style={{color: 'red'}}/>}</td>
                                        <td>{event.eventName}</td>                         
                                        <td>{convertFromYYYYMMDD(event.date)}</td>
                                        <td>{event.timeStart}</td>
                                        <td>{event.timeEnd}</td>
                                        <td>{event.eventLocation?.locationName || <FontAwesomeIcon icon={faBomb} style={{color: 'red'}}/>}</td>                                     
                                        <td>
                                            {isPastEvent(event.date) ? (
                                               <Link to='/report' state={event.eventId}>
                                                    <FontAwesomeIcon
                                                        icon={faFileAlt}
                                                        className={cx('icon', 'report-icon')}
                                                    />
                                               </Link>
                                            ) : (
                                                <>
                                                    <FontAwesomeIcon
                                                        icon={faPen}
                                                        onClick={() => handleEdit(event)}
                                                        className={cx('icon', 'edit-icon')}
                                                    />
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                        onClick={() => handleDelete(event)}
                                                        className={cx('icon', 'delete-icon')}
                                                    />
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={11} style={{textAlign: 'center'}}>Không có kết quả phù hợp...</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {detailEvent && <FormShowEvent onlyShow event={detailEvent} onClose={() => setDetailEvent(null)} />}
        </div>
    );
};

export default ListEventsAdmin;
