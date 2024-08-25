import classNames from "classnames/bind"
import style from "./showAvatar.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
const cx = classNames.bind(style)

const ShowAvatar = ({avtLink, setShow})=>{
    return ( 
    <div className={cx('wrapper')}>
        <div className={cx('avatar')} 
             style={{backgroundImage: `url(${avtLink})`}}>          
        </div>
        <div className={cx('btt-back')}
             onClick={() => setShow(false)}>
                <FontAwesomeIcon className={cx('icon')} icon={faCircleXmark}/>
        </div>      
    </div> );
}
export default ShowAvatar ;