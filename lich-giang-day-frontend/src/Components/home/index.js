import classNames from 'classnames/bind';
import style from './Home.module.scss';

import Button from '../Button';
import logo from '../../image/logo_school.png';

const cx = classNames.bind(style);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo_school')}>
                <img src={logo} alt="logo"></img>
            </div>
            <div className={cx('container')}>
                <h1 className={cx('title')}>
                Phần mềm Quản lý Lịch Công tác Giảng Viên
                </h1>

                <Button primary to="/login" className={cx('btt')}>
                    Login
                </Button>
            </div>
        </div>
    );
}
export default Home;
