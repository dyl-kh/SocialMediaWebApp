import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axi from './axios';

const PageViewRecorder = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        axi.post('/user/page-view', { pathName: pathname });
    }, [pathname]);

    return null;
};

export default PageViewRecorder;
