import React, { useState, useCallback, useEffect } from 'react';
import JsonEditor from '../../base/json-editor';
import useInput from '../../hooks/useInput';

interface ICellInfoData {
    CellData: any;
    CellView: any;
}

export default function CellInfo() {
    const [data, setData] = useState<ICellInfoData>(null);
    const [row, RowInput] = useInput();
    const [column, ColumnInput] = useInput();

    const searchData = useCallback(() => {
        console.log('searchData', row, column);
        chrome.devtools.inspectedWindow.eval(`window.getCellData(${row}, ${column})`, (result: ICellInfoData) => {
            console.log('searchData received', result);
            setData(result);
        });
    }, [row, column, setData]);

    return (
        <div className="cell-info">
            <div className="input-box">
                <div className="input-container row-input-container">
                    <span>行: </span>
                    {RowInput}
                </div>
                <div className="input-container column-input-container">
                    <span>列: </span>
                    {ColumnInput}
                </div>
                <button className="search-btn" onClick={searchData}>
                    查询
                </button>
            </div>
            <JsonEditor data={data} />
        </div>
    );
}
