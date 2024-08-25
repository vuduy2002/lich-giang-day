import axios from 'axios';
import { authHeader } from '../utils/authUtils';

const API_URL = '/events';

export const getEvents = async () => {
    return await axios.get(API_URL, { headers: authHeader() });
};

export const getEventById = async (id) => {
    return await axios.get(`${API_URL}/${id}`, { headers: authHeader() });
};

export const createEvent = async (event) => {
    return await axios.post(API_URL, event, { headers: authHeader() });
};

export const updateEvent = async (id, event) => {
    return await axios.put(`${API_URL}/${id}`, event, {
        headers: authHeader(),
    });
};

export const deleteEvent = async (id) => {
    return await axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
};
