import React, { useState, useCallback } from 'react';
import CellInfo from './component/cell-info';
import WsList from './component/ws-list';
import DatabaseInfo from './component/database-info';
import RadioGroup from './base/radio-group';

/**
 * 展示的模块
 * 现为单选
 */
enum CONTENT_TYPE {
    DATABASE = 'database',
    CELL = 'cell',
    WEBSOCKET = 'websocket',
}

const content = [
    {
        value: CONTENT_TYPE.DATABASE,
        label: 'database-info',
    },
    {
        value: CONTENT_TYPE.CELL,
        label: 'cell-info',
    },
    {
        value: CONTENT_TYPE.WEBSOCKET,
        label: 'websocket-info',
    },
];

export default function Panel() {
    const [contentType, setType] = useState<string>(CONTENT_TYPE.DATABASE);
    const handleTypeChange = useCallback(
        (value: string) => {
            setType(value);
        },
        [setType],
    );

    return (
        <div className="panel-container">
            <RadioGroup title="show" onChange={handleTypeChange} options={content} />

            {/* sheet 使用 */}
            <div
                className="sheet"
                style={{
                    display: contentType === CONTENT_TYPE.CELL ? 'block' : 'none',
                }}
            >
                <div className="cell-info-box">
                    <CellInfo />
                </div>
            </div>

            {/** 文档x */}
            <div
                className="doc-x"
                style={{
                    display: contentType === CONTENT_TYPE.DATABASE ? 'block' : 'none',
                }}
            >
                <div className="database-list-box">
                    <DatabaseInfo />
                </div>
            </div>

            {/** websocket 用来看 mutation */}
            <div
                className="ws-list-box"
                style={{
                    display: contentType === CONTENT_TYPE.WEBSOCKET ? 'block' : 'none',
                }}
            >
                <WsList />
            </div>
        </div>
    );
}
