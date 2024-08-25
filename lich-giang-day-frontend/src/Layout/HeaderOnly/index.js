import Header from '../Components/Header';
import classNames from 'classnames/bind';
import style from './headerOnly.module.scss'
const cx = classNames.bind(style)
function HeaderOnly({ children }) {
    return (
        <div>
            <Header></Header>
            <div className={cx("container")}>
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default HeaderOnly;
