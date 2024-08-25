import classNames from 'classnames/bind';
import style from './ItemSearch.module.scss';

const cx = classNames.bind(style);
function ItemSearch({ data, formData, handleChange, name }) {
    //checked input
    const checked = formData.find((item) => {
        return item.lecturerId === data.lecturerId;
    });

    return (
        <div className={cx('wrapper')}>
            <input
                className={cx('input')}
                type="checkbox"
                name={name}
                value={data.lecturerId}
                checked={!!checked}
                onChange={handleChange}
            />

            <img className={cx('avatar')} src={data.avatar} alt="avatar"></img>

            <div className={cx('content')}>
                <div className={cx('title')}>
                    <span className={cx('name')}>{data.lecturerName}</span>
                </div>
            </div>
        </div>
    );
}

export default ItemSearch;
