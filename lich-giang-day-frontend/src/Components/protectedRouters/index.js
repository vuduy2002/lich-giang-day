import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, roles }) => {
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
        return <Navigate to="/login" state={{ from: location }} />;
    }

    if (roles && roles.indexOf(user.role) === -1) {
        // Nếu vai trò người dùng không phù hợp, chuyển hướng đến trang không được phép
        return <Navigate to="/unauthorized" state={{ from: location }} />;
    }

    // Nếu mọi thứ đều hợp lệ, render component mong muốn
    return children;
};

export default ProtectedRoute;
