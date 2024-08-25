import axios from 'axios';
import { authHeader } from '../utils/authUtils';

const API_URL = '/locations';

export const getLocations = async () => {
    return await axios.get(API_URL, { headers: authHeader() });
};

export const createLocation = async (location) => {
    return await axios.post(API_URL, location, { headers: authHeader() });
};

export const updateLocation = async (id, location) => {
    return await axios.put(`${API_URL}/${id}`, location, {
        headers: authHeader(),
    });
};

export const deleteLocation = async (id) => {
    return await axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
};
