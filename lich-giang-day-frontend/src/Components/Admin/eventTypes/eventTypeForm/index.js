import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './eventTypeForm.module.scss';
import { createEventType, updateEventType } from '../../../../services/eventTypeService';
import Button from '../../../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const EventTypeForm = ({
    children = null,
    listEventTypes = [],
    onBack = () => {},
    setChildren = () => {},
}) => {
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        typeId: '',
        typeName: '',
    });
    const inputRef = useRef();

    let title;
    if (children) {
        title = 'Cập nhật loại sự kiện';
    } else {
        title = 'Thêm mới loại sự kiện';
    }

    useEffect(() => {
        if (children) {
            const {__v, _id, ...rest} = children;
            setFormData(rest);
        } else {
            generateId();
        }
    }, [children]);

    // Create ID
    const generateId = () => {
        const prefix = 'ET';
        let newId = '';
        let arrId = listEventTypes.map((eventType) => eventType.typeId);
        do {
            const randomNum = Math.floor(100 + Math.random() * 900); // Random 3-digit number
            newId = `${prefix}${randomNum}`;
        } while (arrId.includes(newId));

        setFormData((prev) => ({
            ...prev,
            typeId: newId,
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
                await updateEventType(children.typeId, formData);
                resetForm();
                alert('Cập nhật thành công!');
                setChildren(null);
                onBack(false);
            };
            handleUpdate();
        } else {
            const handleCreate = async () => {
                await createEventType(formData);
                resetForm();
                alert('Tạo thành công!');
            };
            handleCreate();
        }
    };

    const resetForm = () => {
        setFormData({
            typeId: '',
            typeName: '',
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
                        name="typeId"
                        value={formData.typeId}
                        readOnly
                        className={cx('input')}
                    />
                </label>
                <label className={cx('label')}>
                    <span className={cx('title')}>Tên loại sự kiện:</span>
                    <input
                        type="text"
                        name="typeName"
                        ref={inputRef}
                        value={formData.typeName}
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

export default EventTypeForm;
