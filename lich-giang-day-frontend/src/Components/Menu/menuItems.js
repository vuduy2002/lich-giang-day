import classNames from 'classnames/bind';
import style from './Menu.module.scss';

import Button from '../Button';

const cx = classNames.bind(style);

function MenuItem({ data, onClick }) {
    const classes = cx('menu-item', {
        sparate: data.sparate,
    });

    return (
        <Button
            className={classes}
            to={data.to}
            leftIcon={data.icon}
            onClick={onClick}
        >
            {data.title}
        </Button>
    );
}

export default MenuItem;
