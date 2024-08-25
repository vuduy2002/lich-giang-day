import axios from 'axios';

const API_URL = '/lecturers';

export const login = async (userId, password) => {
    if (password.length < 6) {
        throw new Error('Password too short');
    }

    const response = await axios.get(`${API_URL}/${userId}`);

    if (!response.data) {
        throw new Error('Invalid userId');
    }

    const user = response.data;

    if (user.password !== password) {
        throw new Error('Invalid password');
    }

    console.log(user)

    const { password: _, _id, __v, lecturerId, ...userInfor } = user;
    const tokenID = btoa(`${user.lecturerId}`);
    const roleUser = user.isAdmin ? 'admin' : 'lecturer';

    localStorage.setItem(
        'user',
        JSON.stringify({ tokenID, dataUser: userInfor, role: roleUser }),
    );
    return { tokenID, role: roleUser, dataUser: userInfor };
};

export const logout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
};
