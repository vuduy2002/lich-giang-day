import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional for styling
import classNames from 'classnames/bind';
import styles from './inputDate.module.scss';
import { convertFromYYYYMMDD } from '../../formatDate';

const cx = classNames.bind(styles);

const InputDate = ({ dateValue, className, setFormData, offset=[], tileDisabled=false }) => {
  const [date, setDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    setDate(dateValue);
  }, [dateValue]);

  const handleDateChange = (newDate) => {
    const formattedMonth = newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1;
    const formattedDate = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
    
    setFormData((prev) => ({
      ...prev,
      date: `${newDate.getFullYear()}-${formattedMonth}-${formattedDate}`,
    }));
    setShowCalendar(false);
  };

  const handleInputClick = () => {
    setShowCalendar((prev) => !prev);
  };

  // get current date to chekc disable or not
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  return (
    <div className={cx('showDate')}>
      <Tippy
        interactive={true}
        visible={showCalendar}
        placement="bottom-start"
        onClickOutside={() => setShowCalendar(false)}
        offset={offset} // Adjust this to change the vertical position
        arrow={false} // Hide the arrow
        content={
          <div className={cx('calendarContainer')}>
            <Calendar
              tileDisabled={tileDisabled ? ({ date }) => {
                const calendarDate = new Date(date);
                calendarDate.setHours(0, 0, 0, 0);
                return calendarDate < currentDate;
              } : false}
              value={dateValue ? new Date(dateValue) : new Date()}
              onChange={handleDateChange}
            />
          </div>
        }
      >
        <div className={cx('dateInputContainer')}>
          <input
            type="text"
            name="date"
            placeholder="ngày / tháng / năm"
            value={date ? convertFromYYYYMMDD(date) : ''}
            readOnly
            className={className}
            onClick={handleInputClick}
          />
        </div>
      </Tippy>
    </div>
  );
};

export default InputDate;
