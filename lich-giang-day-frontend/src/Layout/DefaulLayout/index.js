import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import classNames from 'classnames/bind';
import style from './defaultLayout.module.scss';
const cx = classNames.bind(style);
function DefaultLayOut({ children }) {
    return (
        <div className="wraper grid ">
            <div>
                <Header></Header>
            </div>
            <div className={cx('container', 'row')}>
                <div className={cx('col', 'l-2', 'm-3', 'c-0')}>
                    <Sidebar></Sidebar>
                </div>
                <div className={cx('content', 'col', 'l-10', 'm-9', 'c-12')}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default DefaultLayOut;
