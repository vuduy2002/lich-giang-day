import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './locationForm.module.scss';
import { createLocation, updateLocation } from '../../../../services/locationService';
import Button from '../../../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const LocationForm = ({
    children = null,
    listLocations = [],
    onBack = () => {},
    setChildren = () => {},
}) => {
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        locationId: '',
        locationName: '',
        // Add other fields as needed
    });
    const inputRef = useRef();

    let title;
    if (children) {
        title = 'Cập nhật địa điểm';
    } else {
        title = 'Thêm mới địa điểm';
    }

    useEffect(() => {
        if (children) {
            const { __v, _id, ...rest } = children;
            setFormData(rest);
        } else {
            generateId();
        }
    }, [children]);

    // Create ID
    const generateId = () => {
        const prefix = 'LOC';
        let newId = '';
        let arrId = listLocations.map((location) => location.locationId);
        do {
            const randomNum = Math.floor(100 + Math.random() * 900); // Random 3-digit number
            newId = `${prefix}${randomNum}`;
        } while (arrId.includes(newId));

        setFormData((prev) => ({
            ...prev,
            locationId: newId,
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        for (let key in formData) {
            if (!formData[key]) {
                setError('Vui lòng nhập đầy đủ thông tin.');
                return false;
            }
        }
        setError('');
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (error || !validateForm()) {
            return;
        }

        if (children) {
            const handleUpdate = async () => {
                await updateLocation(children.locationId, formData);
                resetForm();
                alert('Cập nhật thành công!');
                setChildren(null);
                onBack(false);
            };
            handleUpdate();
        } else {
            const handleCreate = async () => {
                await createLocation(formData);
                resetForm();
                alert('Tạo thành công!');
            };
            handleCreate();
        }
    };

    const resetForm = () => {
        setFormData({
            locationId: '',
            locationName: '',
            // Reset other fields as needed
        });
        inputRef.current.focus();
        generateId();
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
                        name="locationId"
                        value={formData.locationId}
                        readOnly
                        className={cx('input')}
                    />
                </label>
                <label className={cx('label')}>
                    <span className={cx('title')}>Tên địa điểm:</span>
                    <input
                        type="text"
                        name="locationName"
                        ref={inputRef}
                        value={formData.locationName}
                        onChange={handleChange}
                        className={cx('input')}
                    />
                </label>
                {error && <p className={cx('error')}>{error}</p>}
                <Button primary>{title}</Button>
            </form>
        </div>
    );
};

export default LocationForm;
