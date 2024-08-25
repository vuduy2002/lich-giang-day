import {
    faCalendarDay,
    faCalendarPlus,
    faHome,
    faKeyboard,
    faLocationDot,
    faRectangleList,
    faSchool,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import routes from '../routes/confix/Routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const HOME_SYSTEM_MENU_ITEMS_ADMIN = [
    {
        icon: <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>,
        title: 'QL Giảng viên',
        to: routes.managermentLecturers,
    },
    {
        icon: <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>,
        title: 'QL Địa điểm',
        to: routes.managementLocations
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard}></FontAwesomeIcon>,
        title: 'QL Loại sự kiện',
        to: routes.managermentEventTypes,
    },
    {
        icon: <FontAwesomeIcon icon={faSchool}></FontAwesomeIcon>,
        title: 'QL Lớp học',
       // to: routes.managermentLecturers,
    },
];

export const SIDE_MENU_ITEMS_ADMIN = [
    {
        icon: <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>,
        title: 'Trang chủ',
        to: routes.homeAdmin,
    },
    {
        icon: <FontAwesomeIcon icon={faCalendarDay}></FontAwesomeIcon>,
        title: 'Danh sách sự kiện',
        to: routes.listEvents,
    },
    {
        icon: <FontAwesomeIcon icon={faCalendarPlus}></FontAwesomeIcon>,
        title: 'Tạo sự kiện',
        to: routes.createEvents,
    },
    {
        icon: <FontAwesomeIcon icon={faRectangleList}></FontAwesomeIcon>,
        title: 'Tạo lịch học',
        to: routes.createSchedules,
    },
];
