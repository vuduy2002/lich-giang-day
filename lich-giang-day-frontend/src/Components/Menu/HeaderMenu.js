import classNames from 'classnames/bind';
import style from './Menu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

function Header_Menu({ title, onBack }) {
    return (
        <div className={cx('header')}>
            <div className={cx('btt_back')} onClick={onBack}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <div className={cx('title_menu')}>{title}</div>
        </div>
    );
}

export default Header_Menu;
