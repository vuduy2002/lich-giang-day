import classNames from 'classnames/bind';

import style from './account.module.scss';
import Menu from '../../Components/Menu';
// import Search from '../../../Components/search';
import { MENU_ITEMS } from '../../listMenuOfPages/accountMenu';

import { useEffect, useState } from 'react';

const cx = classNames.bind(style);
function AccountHeader() {
    const [lecture, setLecture] = useState({});

    // get lecture curent bay id in local storage
    useEffect(() => {
        const lectureCur = JSON.parse(localStorage.getItem('user'));
        setLecture(lectureCur.dataUser);
    }, []);

    const handleOnchange = (item) => {
        console.log(item);
    };
    return (
        <div className={cx('account')}>
            <div className={cx('name-user')}>{lecture.lecturerName}</div>

            <Menu items={MENU_ITEMS} onChange={handleOnchange}>
                <img
                    className={cx('avatar')}
                    src={lecture.avatar}
                    alt="avatar"
                ></img>
            </Menu>
        </div>
    );
}

export default AccountHeader;
