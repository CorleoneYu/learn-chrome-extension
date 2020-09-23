import React from 'react';
// import CellInfo from './component/cell-info';
// import WsList from './component/ws-list';
import DatabaseInfo from './component/database-info';

export default function Panel() {
    return (
        <div className="panel-container">
            {/* sheet 使用 */}
            {/* <div className="sheet">
                <div className="cell-info-box">
                    <CellInfo />
                </div>
                <div className="ws-list-box">
                    <WsList />
                </div>
            </div> */}
            
            {/** 文档x */}
            <div className="doc-x">
                <div className="database-list-box">
                    <DatabaseInfo />
                </div>
            </div>
        </div>
    );
}
