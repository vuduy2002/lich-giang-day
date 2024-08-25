import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './listLectures.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getLecturers, deleteLecturer } from '../../../../services/lectureService';
import Button from '../../../Button/Button';
import LecturerForm from '../lecturerForm';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);
const ListLecturersAdmin = () => {
    const [lecturers, setLecturers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [updateLecturer, setUpdateLecturer] = useState(null);
    const [searchValue, setSearchValue] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const fetchLecturers = async () => {
            const response = await getLecturers();
            setLecturers(response.data);
        };
        fetchLecturers();
    }, [showForm]);

    useEffect(() => {
        const lecturerList = lecturers.filter((lecturer) =>
            lecturer.lecturerName?.toLowerCase().includes(inputValue.toLowerCase()) ||
            lecturer.lecturerId?.toLowerCase().includes(inputValue.toLowerCase()),
        );
        setSearchValue(lecturerList);
    }, [inputValue, lecturers]);

    const handleEdit = (lecturer) => {
        setShowForm(true);
        setUpdateLecturer(lecturer);
    };

    const handleDelete = async (lecturer) => {
        if (
            window.confirm(
                `Bạn muốn xóa Giảng viên có id : ${lecturer.lecturerId} : ${lecturer.lecturerName}`,
            ) === true
        ) {
            await deleteLecturer(lecturer.lecturerId);
            const response = await getLecturers();
            setLecturers(response.data);
        }
    };

    return showForm ? (
        <LecturerForm
            listLecturers={lecturers}
            onBack={setShowForm}
            setChildren={setUpdateLecturer}
        >
            {updateLecturer}
        </LecturerForm>
    ) : (
        <div className={cx('container')}>
            <Button
                outline
                size="S"
                leftIcon={<FontAwesomeIcon icon={faChevronLeft} />}
                onClick={() => {
                   window.history.back();
                }}
            >
                Quay lại
            </Button>
            <h2 className={cx('title')}>Danh sách Giảng viên</h2>
            <div className={cx('header')}>
                <Button
                    primary
                    rightIcon={<FontAwesomeIcon icon={faPlusSquare} />}
                    size="S"
                    onClick={() => setShowForm(true)}
                >
                    Thêm Giảng viên
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
                            <th>Is Admin</th>
                            <th>Chức vụ</th>
                            <th>Ảnh avatar</th>
                            <th>Tên Giảng viên</th>
                            <th>Số điện thoại</th>
                            <th>Mật khẩu</th>
                            <th>Email</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchValue.length>0 ?(  
                            searchValue.map((lecturer) => (
                            <tr key={lecturer.lecturerId}>
                                <td>{lecturer.lecturerId}</td>
                                <td>{lecturer.isAdmin ? 'Yes' : 'No'}</td>
                                <td>{lecturer.position}</td>
                                <td>
                                    <img
                                        className={cx('avatar')}
                                        src={lecturer.avatar}
                                        alt="Avatar"
                                        width="50"
                                        height="50"
                                    />
                                </td>
                                <td>{lecturer.lecturerName}</td>
                                <td>{lecturer.lecturerPhone}</td>
                                <td>{lecturer.password}</td>
                                <td>{lecturer.email}</td>
                                <td className={cx('actions')}>
                                    <FontAwesomeIcon
                                        icon={faPen}
                                        onClick={() => handleEdit(lecturer)}
                                        className={cx('icon', 'edit-icon')}
                                    />
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        onClick={() => handleDelete(lecturer)}
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

export default ListLecturersAdmin;
