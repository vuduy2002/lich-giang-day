import axios from 'axios';
import { authHeader } from '../utils/authUtils';

const API_URL = '/attendances';

export const getAttendanceReports = async () => {
    return await axios.get(API_URL, { headers: authHeader() });
};

export const getAttendanceReportById = async (id) => {
    return await axios.get(`${API_URL}/${id}`, { headers: authHeader() });
};

export const createAttendanceReport = async (report) => {
    return await axios.post(API_URL, report, { headers: authHeader() });
};

export const updateAttendanceReport = async (id, report) => {
    return await axios.put(`${API_URL}/${id}`, report, {
        headers: authHeader(),
    });
};

export const deleteAttendanceReport = async (id) => {
    return await axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
};
