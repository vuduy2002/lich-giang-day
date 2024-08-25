import axios from 'axios';

const API = process.env.REACT_APP_API

export const postEmail = async (email) => {
    return await axios.post(`${API}/request-reset`, { email });
};

export const postCodeVerify = async (email, verificationCode) => {
    return await axios.post(`${API}/verify-code`, { email, code: verificationCode });
};

export const postUpdatePass = async (email, newPassword) => {
    return await axios.post(`${API}/update-password`, { email, newPassword });  
};

