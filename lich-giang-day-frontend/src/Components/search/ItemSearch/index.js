import classNames from 'classnames/bind';
import style from './ItemSearch.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const cx = classNames.bind(style);
function ItemSearch({ data }) {
    return (
        <div className={cx('wrapper')}>
            <img className={cx('avatar')} src={data.avatar} alt="avatar"></img>

            <Link to="/@duy" className={cx('content')}>
                <div className={cx('title')}>
                    <span className={cx('name')}>{data.full_name}</span>
                    <span className={cx('ticked')}>{data.tick && <FontAwesomeIcon icon={faCircleCheck} />}</span>
                </div>
                <div className={cx('nick-name')}>{data.nickname}</div>
            </Link>
        </div>
    );
}

export default ItemSearch;
