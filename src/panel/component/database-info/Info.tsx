import React, { useState, useCallback, useEffect } from 'react';
import JsonEditor from '../json-editor';
import DatabaseInput from './input';
import { DATA_TYPE } from '../../../constant/event';

interface IDatabaseInfoData {
    sheetData: any;
    viewOptions: any;
    viewData: any;
}

export default function DatabaseInfo() {
    const [data, setData] = useState<IDatabaseInfoData>(null);
    const handleMessage = useCallback((message) => {
        console.log('cell-info received', message);
        const { data, type } = message.payload;
        if (type === DATA_TYPE.DATABASE) {
            setData(data);
        }
    }, [setData]);

    useEffect(() => {
        chrome.runtime.onMessage.addListener(handleMessage);
        return () => {
            chrome.runtime.onMessage.removeListener(handleMessage);
        }
    }, [handleMessage])

    return (
        <div className="cell-info">
            <DatabaseInput />
            <JsonEditor data={data} />
        </div>
    );
}
