import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import logo from '../../../image/logo_school.png';
import ShowAvatar from '../../showAvatar'
import {logout} from '../../../services/authService'
import Button from '../../Button';
import Menu from '../../Menu'
import routes from '../../../routes/confix/Routes';
import {HOME_SYSTEM_MENU_ITEMS_ADMIN} from '../../../listMenuOfPages/admin'
import style from './homeAdmin.module.scss'
import { Link } from 'react-router-dom';
const cx = classNames.bind(style);

function HomeAdmin() {

    const [lecturer, setLecturer] = useState({});
    const [showAvatar, setShowAvatar] = useState(false)
    useEffect(() => {
        const lectureCur = JSON.parse(localStorage.getItem('user'));
        setLecturer(lectureCur.dataUser);
    }, []);
   
    return (
        !showAvatar ? (<div className={cx('wrapper')}>
            <div className={cx('logo_school')}>
                <img src={logo} alt="logo"></img>
            </div>
            <div className={cx('container')}>
                <h1 className={cx('title')}>
                    Hệ Thống Quản Lý Lịch Biểu Giáo Viên
                </h1>
                <div className={cx("profile-card")}>
                <div className={cx("profile-image")}>
                    <img src={lecturer.avatar} alt="avatar" 
                          onClick={()=>setShowAvatar(true)}></img>
                </div>
                <div className={cx("profile-info")}>
                   <Link to = {routes.profile}>
                        <div className={cx('infor')}>
                            <h2>{lecturer.lecturerName}</h2>
                            <p>Chức vụ: {lecturer.position}</p>
                            <p>Điện thoại: {lecturer.lecturerPhone}</p>
                            <p>Email: {lecturer.email}</p>
                        </div>
                   </Link>
                    <div>
                        <Button outline size='S' onClick={()=>logout()}  className={cx('btt-logout')}>
                            Đăng Xuất
                        </Button>
                    </div>
                </div> 
            </div>
            
                <div className={cx('box-butt')}>
                    <Menu items={HOME_SYSTEM_MENU_ITEMS_ADMIN}>
                        <div style={{marginRight:'10px'}}>
                            <Button primary size='L' className={cx('btt')}>
                                Quản Lý Hệ Thống
                            </Button>
                        </div>
                    </Menu>
                    
                        <Button primary size='L' to={routes.listEvents} className={cx('btt')}>
                            Quản Lý Sự Kiện
                        </Button>          
                </div>
            </div>
        </div>) : <ShowAvatar avtLink={lecturer.avatar} setShow={setShowAvatar}/>
    );
}

export default HomeAdmin;