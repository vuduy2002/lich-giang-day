import classNames from 'classnames/bind';
import style from './Popper.module.scss';

const cx = classNames.bind(style);

function Popper({ children, bold = false }) {
    return <div className={cx('wrapper', { bold })}>{children}</div>;
}

export default Popper;
