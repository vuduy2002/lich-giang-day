import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './lecturer.module.scss';
import {
    createLecturer,
    updateLecturer,
} from '../../../../services/lectureService';
import Button from '../../../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const LecturerForm = ({
    children = null,
    listLecturers = [],
    onBack = () => {},
    setChildren = () => {},
}) => {
    const [formData, setFormData] = useState({
        lecturerId: '',
        isAdmin: false,
        position: '',
        avatar: '',
        lecturerName: '',
        lecturerPhone: '',
        password: '',
        email: '',
    });
    const [formErrors, setFormErrors] = useState({
        position: '',
        lecturerName: '',
        lecturerPhone: '',
        password: '',
        email: '',
    });

    const inputRef = useRef();

    let title = children ? 'Cập nhật thông tin giảng viên' : 'Thêm mới giảng viên';

    // Default prefix when component mounts
    const defaultPrefix = 'TC';

    useEffect(() => {
        const newId = generateId(defaultPrefix);
        setFormData((prev) => ({
            ...prev,
            lecturerId: newId,
        }));
    }, []);

    useEffect(() => {
        if (children) {
            const { __v, _id, ...rest } = children;
            setFormData(rest);
        }
    }, [children]);

    // Create id with prefix based on isAdmin status
    const generateId = (prefix) => {
        let newId = '';
        let arrId = listLecturers.map((lecturer) => lecturer.lecturerId);
        do {
            const randomNum = Math.floor(100 + Math.random() * 900); // Random 3-digit number
            newId = `${prefix}${randomNum}`;
        } while (arrId.includes(newId));

        return newId;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'isAdmin') {
            const prefix = checked ? 'AD' : 'TC';
            const newId = generateId(prefix);
            setFormData((prev) => ({
                ...prev,
                [name]: checked,
                lecturerId: newId,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.position) errors.position = 'Vui lòng nhập chức vụ.';
        if (!formData.lecturerName) errors.lecturerName = 'Vui lòng nhập tên giảng viên.';
        if (!formData.lecturerPhone) errors.lecturerPhone = 'Vui lòng nhập số điện thoại.';
        if (!formData.password) {
            errors.password = 'Vui lòng nhập mật khẩu.';
        } else if (formData.password.length < 6) {
            errors.password = 'Mật khẩu phải có ít nhất 6 ký tự.';
        }
        if (!formData.email) {
            errors.email = 'Vui lòng nhập email.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email không hợp lệ.';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        if (children) {
            const handleUpdate = async () => {
                await updateLecturer(children.lecturerId, formData);
                resetForm();
                alert('Cập nhật thành công!');
                setChildren(null);
                onBack(false);
            };
            handleUpdate();
        } else {
            const handleCreate = async () => {
                await createLecturer(formData);
                resetForm();
                alert('Tạo thành công!');
            };
            handleCreate();
        }
    };

    const resetForm = () => {
        const newId = generateId(defaultPrefix);
        setFormData({
            lecturerId: newId,
            isAdmin: false,
            position: '',
            avatar: '',
            lecturerName: '',
            lecturerPhone: '',
            password: '',
            email: '',
        });
        setFormErrors({
            position: '',
            lecturerName: '',
            lecturerPhone: '',
            password: '',
            email: '',
        });
        inputRef.current.focus();
    };

    return (
        <div className={cx('container')}>
            <Button
                leftIcon={<FontAwesomeIcon icon={faChevronLeft} />}
                onClick={() => {
                    resetForm();
                    setChildren(null);
                    onBack(false);
                }}
            >
                Quay lại
            </Button>
            <h2>{title}</h2>
            <form onSubmit={handleSubmit} className={cx('form')}>
                <label className={cx('label')}>
                    <span className={cx('title')}>ID:</span>
                    <input
                        type="text"
                        name="lecturerId"
                        value={formData.lecturerId}
                        placeholder="ID sẽ tự động tạo khi bạn Click ô bên dưới!"
                        readOnly
                        className={cx('input')}
                    />
                </label>
                <label className={cx('label')}>
                    <span className={cx('title')}>Is Admin:</span>
                    <div className={cx('wrapCheckbox')}>
                        <input
                            type="checkbox"
                            name="isAdmin"
                            checked={formData.isAdmin}
                            onChange={handleChange}
                            className={cx('checkbox')}
                        />
                        <span>
                            Lưu ý: Click để tạo ID theo quyền!
                        </span>
                    </div>
                </label>
                <label className={cx('label')}>
                    <span className={cx('title')}>Chức vụ:</span>
                    <input
                        type="text"
                        name="position"
                        ref={inputRef}
                        value={formData.position}
                        onChange={handleChange}
                        className={cx('input')}
                    />
                    {formErrors.position && (
                        <p className={cx('error')}>{formErrors.position}</p>
                    )}
                </label>
                <label className={cx('label')}>
                    <span className={cx('title')}>Avatar URL:</span>
                    <input
                        type="text"
                        name="avatar"
                        value={formData.avatar}
                        placeholder="Có thể bỏ qua"
                        onChange={handleChange}
                        className={cx('input')}
                    />
                </label>
                <label className={cx('label')}>
                    <span className={cx('title')}>Tên Giảng viên:</span>
                    <input
                        type="text"
                        name="lecturerName"
                        value={formData.lecturerName}
                        onChange={handleChange}
                        className={cx('input')}
                    />
                    {formErrors.lecturerName && (
                        <p className={cx('error')}>{formErrors.lecturerName}</p>
                    )}
                </label>
                <label className={cx('label')}>
                    <span className={cx('title')}>Số điện thoại:</span>
                    <input
                        type="text"
                        name="lecturerPhone"
                        value={formData.lecturerPhone}
                        onChange={handleChange}
                        className={cx('input')}
                    />
                    {formErrors.lecturerPhone && (
                        <p className={cx('error')}>{formErrors.lecturerPhone}</p>
                    )}
                </label>
                <label className={cx('label')}>
                    <span className={cx('title')}>Mật khẩu:</span>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={cx('input')}
                    />
                    {formErrors.password && (
                        <p className={cx('error')}>{formErrors.password}</p>
                    )}
                </label>
                <label className={cx('label')}>
                    <span className={cx('title')}>Email:</span>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={cx('input')}
                    />
                    {formErrors.email && (
                        <p className={cx('error')}>{formErrors.email}</p>
                    )}
                </label>
                {Object.values(formErrors).some((error) => error) && (
                    <p className={cx('error')}>Vui lòng kiểm tra lại các trường thông tin.</p>
                )}
                <Button primary>{title}</Button>
            </form>
        </div>
    );
};

export default LecturerForm;
