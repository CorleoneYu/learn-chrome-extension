import React, { useCallback } from 'react';
import useInput from '../../hooks/useInput';
import './style.less';

const SearchInput = () => {
    const [index, IndexInput] = useInput();

    const searchDatabase = useCallback(() => {
        console.log('searchDatabase', index);
        chrome.devtools.inspectedWindow.eval(`window.getDatabase(${index})`);
    }, [index]);

    return (
        <div className="input-box">
            <div className="input-container row-input-container">
                <span>index: </span>
                {IndexInput}
            </div>
            <button className="search-btn" onClick={searchDatabase}>
                查询
            </button>
        </div>
    );
};

export default SearchInput;
