import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLanguage, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../services/authService';
import routes from '../routes/confix/Routes';
export const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>,
        title: 'Profile',
        to: routes.profile,
    },
    {
        icon: <FontAwesomeIcon icon={faLanguage}></FontAwesomeIcon>,
        title: 'Languages',
        children: {
            title: 'Language',
            data: [
                { type: 'Languages', code: 'en', title: 'English' },
                { type: 'Languages', code: 'vn', title: 'Viet Nam' },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>,
        title: 'Signout',
        sparate: true,
       
        onClick: () => logout(),
    },
];
