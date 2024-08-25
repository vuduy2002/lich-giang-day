import React, { useState } from 'react';
import { login } from '../../services/authService';
import classNames from 'classnames/bind';
import routes from '../../routes/confix/Routes';
import style from './Login.module.scss';
import Button from '../../Components/Button';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

const Login = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await login(userId, password);
            if (user.role === 'admin') {
                window.location.href = routes.homeAdmin;
            } else if (user.role === 'lecturer') {
                window.location.href = routes.lecturerCalender;
            }
        } catch (error) {
            if (error.message === 'Invalid password') {
                setErrorMessage('Mật khẩu không đúng.');
            } else if (error.message === 'Password too short') {
                setErrorMessage('Mật khẩu phải có ít nhất 6 ký tự.');
            } else {
                setErrorMessage('Không tìm thấy ID.');
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('login-container')}>
                <h1 className={cx('login-title')}>Đăng nhập</h1>
                <form onSubmit={handleSubmit}>
                    <div className={cx('input-group')}>
                        <label className={cx('input-group-label')} htmlFor="username">
                            ID đăng nhập
                        </label>
                        <input
                            className={cx('input-group-input')}
                            type="text"
                            id="username"
                            name="username"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                        />
                    </div>
                    <div className={cx('input-group')}>
                        <label className={cx('input-group-label')} htmlFor="password">
                            Mật khẩu
                        </label>
                        <input
                            className={cx('input-group-input')}
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button primary> Đăng nhập</Button>
                </form>
                {errorMessage && (
                    <div className={cx('error-message')}>{errorMessage}</div>
                )}
                <Link to={routes.resetpass}><p className={cx('resetPass')}>Quên mật khẩu - Đổi mật khẩu?</p></Link>
            </div>
        </div>
    );
};

export default Login;
