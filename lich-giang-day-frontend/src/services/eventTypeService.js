import axios from 'axios';
import { authHeader } from '../utils/authUtils';

const API_URL = '/eventTypes';

export const getEventTypes = async () => {
    return await axios.get(API_URL, { headers: authHeader() });
};

export const createEventType = async (eventType) => {
    return await axios.post(API_URL, eventType, { headers: authHeader() });
};

export const updateEventType = async (id, eventType) => {
    return await axios.put(`${API_URL}/${id}`, eventType, {
        headers: authHeader(),
    });
};

export const deleteEventType = async (id) => {
    return await axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
};
