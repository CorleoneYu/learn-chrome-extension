import React, { useState, useCallback, useEffect } from 'react';
import JsonEditor from '../json-editor';
import SearchInput from '../search-input';
import { DATA_TYPE } from '../../../constant/event';

interface ICellInfoData {
    CellData: any;
    CellView: any;
}

export default function CellInfo() {
    const [data, setData] = useState<ICellInfoData>(null);
    const handleMessage = useCallback((message) => {
        console.log('cell-info received', message);
        const { data, type } = message.payload;
        if (type === DATA_TYPE.CELL_INFO) {
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
            <SearchInput />
            <JsonEditor data={data} />
        </div>
    );
}
