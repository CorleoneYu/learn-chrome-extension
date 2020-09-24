import React, { useState, useCallback, useEffect } from 'react';
import './style.less';

const WsList = () => {
    const [wsList, setWsList] = useState<any>([]);

    const getHar = useCallback(() => {
        chrome.devtools.network.getHAR(har => {
            const wsList = [];
            har.entries.forEach(entry => {
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
            })
            console.log('wsList', wsList);
            setWsList(wsList);
        })
    }, [setWsList]);

    return <div className="ws-list">
        <button onClick={getHar}>getHar()</button>
        {wsList.map(ws => (
            <div className="ws-item" key={ws.id}>
                <div className="message-list">
                    {ws.webSocketMessages.map(message => (
                        <div className="message-item" key={message.time}>
                            <div className="message-type">type: {message.type}</div>
                            <div className="message-data">{message.data}</div>
                        </div>
                    ))}
                </div>
                
            </div>
        ))}
    </div>
}

export default WsList;
