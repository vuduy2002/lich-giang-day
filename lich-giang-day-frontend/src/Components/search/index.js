import classNames from 'classnames/bind';
import style from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import Popper from '../Popper';
import ItemSearch from './ItemSearch';
import { useDebouce } from '../hooks';

const cx = classNames.bind(style);

function Search() {
    const refInput = useRef();
    const [inputValue, setInputValue] = useState('');
    const [datas, setDatas] = useState([]);
    const [showlist, setShowlist] = useState(true);

    //delete icon
    let iconDelete = false;
    if (inputValue.trim().length > 0) {
        iconDelete = true;
    }
    const handleDelete = () => {
        setInputValue('');
        refInput.current.focus();
    };

    //showlist

    //API

    const debouce = useDebouce(inputValue, 500);

    useEffect(() => {
        if (inputValue.trim().length < 1) {
            setDatas([]);
            return;
        }
        fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(inputValue)}&type=less`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((dataAPI) => {
                setDatas(dataAPI.data);
            });
    }, [debouce]);

    return (
        <Tippy
            visible={showlist && datas.length > 0}
            interactive
            render={(attrs) => (
                <div className={cx('box-result')} tabIndex="-1" {...attrs}>
                    <Popper>
                        {datas.map((data1) => {
                            return <ItemSearch data={data1} key={data1.id} />;
                        })}
                    </Popper>
                </div>
            )}
            onClickOutside={() => {
                setShowlist(false);
            }}
        >
            <div className={cx('wrapper')}>
                <input
                    ref={refInput}
                    value={inputValue}
                    className={cx('search-input')}
                    placeholder="Search"
                    onChange={(e) => {
                        setInputValue(e.target.value);
                    }}
                    onFocus={() => setShowlist(true)}
                ></input>
                {iconDelete && <FontAwesomeIcon className={cx('delete')} icon={faXmark} onClick={handleDelete} />}

                <div className={cx('glass')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faSearch} />
                </div>
            </div>
        </Tippy>
    );
}

export default Search;
