
import {
    faCalendarDay,
    faCalendarPlus,
   
} from '@fortawesome/free-solid-svg-icons';
import routes from '../routes/confix/Routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SIDE_MENU_ITEMS_LECTURER = [
    {
        icon: <FontAwesomeIcon icon={faCalendarDay}></FontAwesomeIcon>,
        title: 'Lịch của bạn',
        to: routes.lecturerCalender,
    },
    {
        icon: <FontAwesomeIcon icon={faCalendarPlus}></FontAwesomeIcon>,
        title: 'Thông báo',
        //to: '/createEvents',
    },
  
]
