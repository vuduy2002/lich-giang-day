import axios from 'axios';


export const postEmail = async (email) => {
    return await axios.post('/request-reset', { email });
};

export const postCodeVerify = async (email, verificationCode) => {
    return await axios.post('/verify-code', { email, code: verificationCode });
};

export const postUpdatePass = async (email, newPassword) => {
    return await axios.post('/update-password', { email, newPassword });
};

