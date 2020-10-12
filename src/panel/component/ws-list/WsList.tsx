import React, { useState, useCallback } from 'react';
import MessageList from './MessageList';
import useSwitch from '../../hooks/useSwitch';
import JsonEditor from '../../base/json-editor';
import './style.less';

interface IMutation {
    [key: string]: any;
}

const WsList = () => {
    const [wsList, setWsList] = useState<any>([]);
    const { SwitchCom: HeartBeatSwitch, value: showHeartBeat } = useSwitch('展示心跳包', false);
    const { SwitchCom: OnlyUserChangesSwitch, value: onlyUserChanges } = useSwitch('仅展示 User Changes', true);
    const [data, setData] = useState<IMutation[]>([]);

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
            <JsonEditor data={data} />
            <div className="form">
                <div className="form-item">
                    <button onClick={getHar}>getHar()</button>
                </div>
                <div className="form-item">{OnlyUserChangesSwitch}</div>
                {!onlyUserChanges && <div className="form-item">{HeartBeatSwitch}</div>}
            </div>

            {wsList.map((ws) => (
                <div className="ws-item" key={ws.id}>
                    <MessageList
                        messageList={ws.webSocketMessages}
                        showHeartBeat={showHeartBeat}
                        onlyUserChanges={onlyUserChanges}
                        onMutationChange={setData}
                    />
                </div>
            ))}
        </div>
    );
};

export default WsList;
