import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import style from './Button.module.scss';

const cx = classNames.bind(style);

function Button({
    to,
    href,
    primary = false,
    outline = false,
    text = false,
    size = false,
    disabled = false,
    rouded = false,
    children,
    leftIcon,
    rightIcon,
    className,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const _prop = { onClick, ...passProps };

    // remove event when disabled
    if (disabled) {
        Object.keys(_prop).forEach((key) => {
            if (key.startsWith('on') && typeof _prop[key] === 'function') {
                delete _prop[key];
            }
        });
    }

    // chose type
    if (to) {
        Comp = Link;
        _prop.to = to;
    } else if (href) {
        Comp = 'a';
        _prop.href = href;
    }

    //classnames
    const clases = cx('wrapper', {
        primary,
        outline,
        text,
        disabled,
        rouded,
        [size]: size,
        [className]: className,
    });

    return (
        <Comp className={clases} {..._prop}>
            <span className={cx('icon')}>{leftIcon}</span>
            <span className={cx('title')}>{children}</span>
            <span className={cx('icon')}>{rightIcon}</span>
        </Comp>
    );
}

export default Button;
