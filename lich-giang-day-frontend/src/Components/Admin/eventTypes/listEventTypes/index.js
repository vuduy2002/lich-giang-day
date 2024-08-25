import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './listEventTypes.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getEventTypes, deleteEventType } from '../../../../services/eventTypeService';
import Button from '../../../Button/Button';
import EventTypeForm from '../eventTypeForm';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);
const ListEventTypes = () => {
    const [eventTypes, setEventTypes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [updateEventType, setUpdateEventType] = useState(null);
    const [searchValue, setSearchValue] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const fetchEventTypes = async () => {
            const response = await getEventTypes();
            setEventTypes(response.data);
        };
        fetchEventTypes();
    }, [showForm]);

    useEffect(() => {
        const eventTypeList = eventTypes.filter((eventType) =>
            eventType.typeName?.toLowerCase().includes(inputValue.toLowerCase())||
            eventType.typeId?.toLowerCase().includes(inputValue.toLowerCase())
        );
        setSearchValue(eventTypeList);
    }, [inputValue, eventTypes]);

    const handleEdit = (eventType) => {
        setShowForm(true);
        setUpdateEventType(eventType);
    };

    const handleDelete = async (eventType) => {
        if (window.confirm(`Bạn muốn xóa loại sự kiện có id: ${eventType.typeId} : ${eventType.typeName}`) === true) {
            await deleteEventType(eventType.typeId);
            const response = await getEventTypes();
            setEventTypes(response.data);
        }
    };

    return showForm ? (
        <EventTypeForm
            listEventTypes={eventTypes}
            onBack={setShowForm}
            setChildren={setUpdateEventType}
        >
            {updateEventType}
        </EventTypeForm>
    ) : (
        <div className={cx('container')}>
            <Button
                outline
                leftIcon={<FontAwesomeIcon icon={faChevronLeft} />}
                size="S"
                onClick={() => {
                    window.history.back();
                }}
            >
                Quay lại
            </Button>
            <h2 className={cx('title')}>Danh sách loại sự kiện</h2>
            <div className={cx('header')}>
                <Button
                    primary
                    rightIcon={<FontAwesomeIcon icon={faPlusSquare} />}
                    size="S"
                    onClick={() => setShowForm(true)}
                >
                    Thêm loại sự kiện
                </Button>
                <input
                    type="text"
                    value={inputValue}
                    placeholder="Search..."
                    className={cx('inputSearch')}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </div>
            <div className={cx('boxTable')}>
                <table className={cx('table')}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên loại sự kiện</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchValue.length > 0 ? (
                            searchValue.map((eventType) => (
                            <tr key={eventType.typeId}>
                                <td>{eventType.typeId}</td>
                                <td>{eventType.typeName}</td>
                                <td className={cx('actions')}>
                                    <FontAwesomeIcon
                                        icon={faPen}
                                        onClick={() => handleEdit(eventType)}
                                        className={cx('icon', 'edit-icon')}
                                    />
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        onClick={() => handleDelete(eventType)}
                                        className={cx('icon', 'delete-icon')}
                                    />
                                </td>
                            </tr>
                        ))):(
                            <tr><td colSpan={11} style={{textAlign: 'center'}}>Không có kết quả phù hợp...</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListEventTypes;
