import HeaderOnly from '../Layout/HeaderOnly';
import routes from './confix/Routes';

import HomePage from '../Pages/Home';
import Login from '../Components/login';
import PasswordReset from '../Components/resetpass';
import profilePage from '../Pages/profilePage';

import HomeAdminPage from '../Pages/adminPage/homeAdmin';
import CreateEvents from '../Pages/adminPage/createEvents';

import CreateSchedule from '../Pages/adminPage/createSchedules';
import ListEvents from '../Pages/adminPage/listEvents';
import ManagementLecturers from '../Pages/adminPage/managementLecturers';
import ManagementEventTypes from '../Pages/adminPage/managementEventTypes';
import ManagementLocations from '../Pages/adminPage/managementLocations';


import Report from '../Pages/adminPage/report';

//lecturer
import LecturerCalender from '../Pages/lecturerPage/lecturerCalender';

const publicPages = [
    { path: routes.home, component: HomePage, layout: null },
    { path: routes.login, component: Login, layout: null },
    { path: routes.resetpass, component: PasswordReset, layout: null },
    
    //admin pages
    { path: routes.homeAdmin, roles: 'admin', component: HomeAdminPage, layout: null },
    { path: routes.createEvents, roles: 'admin', component: CreateEvents },
    { path: routes.createSchedules, roles: 'admin', component: CreateSchedule },
    { path: routes.listEvents, roles: 'admin', component: ListEvents },
    {
        path: routes.managermentLecturers,
        roles: 'admin',
        component: ManagementLecturers,
        layout: HeaderOnly
    },
    {
        path: routes.managermentEventTypes,
        roles: 'admin',
        component: ManagementEventTypes,
        layout: HeaderOnly
    },
    {
        path: routes.managementLocations,
        roles: 'admin',
        component: ManagementLocations,
        layout: HeaderOnly
    },
    { path: routes.report, roles: 'admin', component: Report },

    //teacher pages

    {
        path: routes.lecturerCalender,
        roles: 'lecturer',
        component: LecturerCalender,
    },
    { path: routes.profile, component: profilePage, layout: null },

    // { path: routes.notification, component: Notification },
    // { path: routes.report, component: Report },

    // { path: '/following', component: Following, layout: null },
    // { path: '/contact', component: Contact, layout: HeaderOnly },
];

const privatePages = [];

export { publicPages, privatePages };
