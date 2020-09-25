import React, { useState, useCallback, useEffect } from 'react';
import JsonEditor from '../json-editor';
import useInput from '../../hooks/useInput';
import './style.less';

interface IDatabaseInfoData {
    sheetData: any;
    viewOptions: any;
    viewData: any;
}

export default function DatabaseInfo() {
    const [data, setData] = useState<IDatabaseInfoData>(null);
    const [index, IndexInput] = useInput();

    const searchDatabase = useCallback(() => {
        console.log('searchDatabase', index);
        chrome.devtools.inspectedWindow.eval(`window.getDatabase(${index})`, (result: IDatabaseInfoData) => {
            console.log('searchDatabase received', result);
            setData(result);
        });
    }, [index, setData]);

    return (
        <div className="cell-info">
            <div className="input-box">
                <div className="input-container row-input-container">
                    <span>index: </span>
                    {IndexInput}
                </div>
                <button className="search-btn" onClick={searchDatabase}>
                    查询
                </button>
            </div>
            <JsonEditor data={data} />
        </div>
    );
}
