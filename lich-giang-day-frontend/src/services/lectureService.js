import axios from 'axios';
import { authHeader } from '../utils/authUtils';

const API = process.env.REACT_APP_API
const API_URL = `${API}/lecturers`;

export const getLecturers = async () => {
    return await axios.get(API_URL, { headers: authHeader() });
};

export const getLecturerById = async (id) => {
    return await axios.get(`${API_URL}/${id}`, { headers: authHeader() });
};

export const createLecturer = async (Lecturer) => {
    return await axios.post(API_URL, Lecturer, { headers: authHeader() });
};

export const updateLecturer = async (id, Lecturer) => {
    return await axios.put(`${API_URL}/${id}`, Lecturer, {
        headers: authHeader(),
    });
};

export const deleteLecturer = async (id) => {
    return await axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
};
