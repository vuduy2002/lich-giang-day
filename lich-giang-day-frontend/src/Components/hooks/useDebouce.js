import { useEffect, useState } from 'react';

function useDebouced(value, delay) {
    const [state, setState] = useState(value);
    useEffect(() => {
        const timeid = setTimeout(() => {
            setState(value);
        }, delay);
        return () => {
            clearTimeout(timeid);
        };
    }, [value]);

    return state;
}

export default useDebouced;
