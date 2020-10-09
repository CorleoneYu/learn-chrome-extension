import React, { useState, useCallback } from 'react';
import MessageList from './MessageList';
import useSwitch from '../../hooks/useSwitch';

import './style.less';

const WsList = () => {
    const [wsList, setWsList] = useState<any>([]);
    const { SwitchCom, value: showHeartBeat } = useSwitch('展示心跳包', false);

    const getHar = useCallback(() => {
        chrome.devtools.network.getHAR((har) => {
            const wsList = [];
            har.entries.forEach((entry) => {
                // @ts-ignore
                if (entry._resourceType === 'websocket') {
                    const ws = {
                        id: entry.time,
                        request: entry.request,
                        // @ts-ignore
                        webSocketMessages: entry._webSocketMessages,
                    };
                    wsList.push(ws);
                }
            });
            console.log('wsList', wsList);
            setWsList(wsList);
        });
    }, [setWsList]);

    return (
        <div className="ws-list">
            <div className="form">
                <button onClick={getHar}>getHar()</button>
                {SwitchCom}
            </div>

            {wsList.map((ws) => (
                <div className="ws-item" key={ws.id}>
                    <MessageList messageList={ws.webSocketMessages} showHeartBeat={showHeartBeat} />
                </div>
            ))}
        </div>
    );
};

export default WsList;
