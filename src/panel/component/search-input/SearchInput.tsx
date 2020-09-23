import React, { useCallback } from 'react';
import useInput from '../../hooks/useInput';
import './style.less';

const SearchInput = () => {
    const [row, RowInput] = useInput();
    const [column, ColumnInput] = useInput();

    const searchData = useCallback(() => {
        console.log('searchData', row, column);
        chrome.devtools.inspectedWindow.eval(`window.getCellData(${row}, ${column})`);
    }, [row, column]);

    return (
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
    );
};

export default SearchInput;
