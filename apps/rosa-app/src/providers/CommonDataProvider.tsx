import { useEffect, useState } from 'react';
import { fetchCommonData } from '../services/calendar.services';

export default function CommonDataProvider(props: any) {
    const [data, setData] = useState({} as any)
    useEffect(() => {
        fetchCommonData().then((commonData) => {
            setData(commonData)
        });
    }, []);

    return props.doRender({ commonData: data });
}
