import React from 'react';
import CellInfo from './component/cell-info';
import WsList from './component/ws-list';

export default function Panel() {
    return (
        <div className="panel-container">
            <div className="cell-info-box">
                <CellInfo />
            </div>
            <div className="ws-list-box">
                <WsList />
            </div>
        </div>
    );
}
