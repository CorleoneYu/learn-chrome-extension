import React, { useState, useCallback, useEffect } from 'react';
import JsonEditor from '../../base/json-editor';
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

    const searchDatabaseByIndex = useCallback(() => {
        console.log('searchDatabaseByIndex', index);
        chrome.devtools.inspectedWindow.eval(`window.getDatabaseByIndex(${index})`, (result: IDatabaseInfoData) => {
            console.log('searchDatabase received', result);
            setData(result);
        });
    }, [index, setData]);

    const searchActiveDatabase = useCallback(() => {
        console.log('searchActiveDatabase');
        chrome.devtools.inspectedWindow.eval(`window.getActiveDatabase()`, (result: IDatabaseInfoData) => {
            console.log('searchDatabase received', result);
            setData(result);
        });
    }, []);

    return (
        <div className="cell-info">
            <div className="input-box">
                <div className="input-container row-input-container">
                    <span>index: </span>
                    {IndexInput}
                </div>
                <button className="search-btn" onClick={searchDatabaseByIndex}>
                    查询
                </button>
                <button className="search-active-btn" onClick={searchActiveDatabase}>
                    查询 active 视图
                </button>
            </div>
            <JsonEditor data={data} />
        </div>
    );
}
