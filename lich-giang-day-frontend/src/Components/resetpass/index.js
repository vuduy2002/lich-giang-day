import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './resetPass.module.scss';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {postEmail, postCodeVerify, postUpdatePass} from '../../services/resetPass'
import { ClipLoader } from 'react-spinners'; // Import spinner
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1);
    const [timer, setTimer] = useState(60);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    useEffect(() => {
        let countdown;
        if (step === 2 && timer > 0) {
            countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
        }
        if (timer === 0) {
            setStep(1);
            setTimer(60);
        }
        return () => clearInterval(countdown);
    }, [step, timer]);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleEmailSubmit = async () => {
        if (!email || !validateEmail(email)) {
            setError('Vui lòng nhập Email');
            return;
        }
        setError('');
        setLoading(true); // Start loading
        try {
            console.log('Sending request to /request-reset with email:', email);
            await postEmail(email);
            console.log('Request successful, moving to step 2');
            setStep(2);
            setTimer(60);
        } catch (error) {
            console.error(error);
            setError('Email không đúng!');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleCodeSubmit = async () => {
        if (!verificationCode) {
            setError('Vui lòng nhập mã được gửi về Email của bạn!');
            return;
        }
        setError('');
        try {
            await postCodeVerify(email,  verificationCode );
            setStep(3);
        } catch (error) {
            console.error(error);
            setError('Mã xác thực không đúng!');
        }
    };

    const handlePasswordSubmit = async () => {
        if (!newPassword) {
            setError('Vui lòng nhập mật khẩu mới');
            return;
        }
        setError('');
        try {
            postUpdatePass(email, newPassword);
            setStep(1); // Reset to initial step
            window.location.href = '/'; // Redirect to homepage
        } catch (error) {
            console.error(error);
            await setError('Lỗi! không thể cập nhật mật khẩu');
        }
    };

    return (
       <div className={cx('wrapper')}>
            <div className={cx('passwordResetContainer')}>
                {loading ? (
                    <div className={cx('spinnerContainer')}>
                        <ClipLoader size={50} color={"#123abc"} loading={loading} />
                    </div>
                ) : (
                    <div> 
                        <FontAwesomeIcon icon={faChevronLeft} onClick={()=>window.history.back()}/>
                        {step === 1 && (
                            <div className={cx('form-input')}>
                                <h2>Nhập email của bạn</h2>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={cx('inputField')}
                                    required
                                />
                                <Button primary onClick={handleEmailSubmit}>
                                    Nhận mã xác thực
                                </Button>
                            </div>
                        )}
                        {step === 2 && (
                            <div className={cx('form-input')}>
                                <h2>Nhập mã xác thực của bạn</h2>
                                <input
                                    type="text"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    className={cx('inputField')}
                                    required
                                />
                                <Button primary onClick={handleCodeSubmit}>
                                    Xác nhận mã xác thực
                                </Button>
                                <p className={cx('show-time')}>Mã sẽ hết hạn sau: {timer} giây</p>
                            </div>
                        )}
                        {step === 3 && (
                            <div className={cx('form-input')}>
                                <h2>Nhập mật khẩu mới</h2>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className={cx('inputField')}
                                    required
                                />
                                <Button primary onClick={handlePasswordSubmit}>
                                    Xác Nhận
                                </Button>
                            </div>
                        )}
                    </div>
                )}
                {error && <div className={cx('error')}>{error}</div>}
            </div>
       </div>
    );
};

export default PasswordReset;
