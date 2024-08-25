import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import style from './Menu.module.scss';
import Popper from '../Popper';
import MenuItem from './menuItems';
import HeaderMenu from './HeaderMenu';
import { useState } from 'react';

const cx = classNames.bind(style);
const func = () => {};

function Menu({ children, visible, items = [], onChange = func }) {
    const [history, setHistory] = useState([{ data: items }]);
   

    //Lấy theo phần tử cuối
    const curentMenu = history[history.length - 1];

    const renderItems = () => {
        return curentMenu.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((pre) => [...pre, item.children]);
                        } else {
                            if (!!item.onClick) {
                                item.onClick();
                            }
                        }
                    }}
                ></MenuItem>
            );
        });
    };
   
    return (
        <Tippy
            interactive
            appendTo={document.body}
            placement="bottom-start"
            visible={visible}
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <Popper>
                        <div className={cx('menu-wrap')}>
                            {history.length > 1 && (
                                <HeaderMenu
                                    title={'Child Menu'}
                                    onBack={() => {
                                        setHistory((pre) =>
                                            pre.slice(0, pre.length - 1),
                                        );
                                    }}
                                ></HeaderMenu>
                            )}
                            {renderItems()}
                        </div>
                    </Popper>
                </div>
            )}
            onHide={() => {
                setHistory((pre) => pre.slice(0, 1));
            }}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
