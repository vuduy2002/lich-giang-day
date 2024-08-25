import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './listLocations.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getLocations, deleteLocation } from '../../../../services/locationService';
import Button from '../../../Button/Button';
import LocationForm from '../locationForm';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

const ListLocations = () => {
    const [locations, setLocations] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [updateLocation, setUpdateLocation] = useState(null);
    const [searchValue, setSearchValue] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const fetchLocations = async () => {
            const response = await getLocations();
            setLocations(response.data);
        };
        fetchLocations();
    }, [showForm]);

    useEffect(() => {
        const locationList = locations.filter((location) =>
            location.locationName?.toLowerCase().includes(inputValue.toLowerCase())||
            location.locationId?.toLowerCase().includes(inputValue.toLowerCase())
        );
        setSearchValue(locationList);
    }, [inputValue, locations]);

    const handleEdit = (location) => {
        setShowForm(true);
        setUpdateLocation(location);
    };

    const handleDelete = async (location) => {
        if (window.confirm(`Bạn muốn xóa địa điểm có id: ${location.locationId} : ${location.locationName}`)) {
            await deleteLocation(location.locationId);
            const response = await getLocations();
            setLocations(response.data);
        }
    };

    return showForm ? (
        <LocationForm
            listLocations={locations}
            onBack={setShowForm}
            setChildren={setUpdateLocation}
        >
            {updateLocation}
        </LocationForm>
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
            <h2 className={cx('title')}>Danh sách địa điểm</h2>
            <div className={cx('header')}>
                <Button
                    primary
                    rightIcon={<FontAwesomeIcon icon={faPlusSquare} />}
                    size="S"
                    onClick={() => setShowForm(true)}
                >
                    Thêm địa điểm
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
                            <th>Tên địa điểm</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchValue.length >0 ?(
                            searchValue.map((location) => (
                                <tr key={location.locationId}>
                                    <td>{location.locationId}</td>
                                    <td>{location.locationName}</td>
                                    <td className={cx('actions')}>
                                        <FontAwesomeIcon
                                            icon={faPen}
                                            onClick={() => handleEdit(location)}
                                            className={cx('icon', 'edit-icon')}
                                        />
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            onClick={() => handleDelete(location)}
                                            className={cx('icon', 'delete-icon')}
                                        />
                                    </td>
                                </tr>
                            ))): (
                                <tr><td colSpan={11} style={{textAlign: 'center'}}>Không có kết quả phù hợp...</td></tr>
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListLocations;
