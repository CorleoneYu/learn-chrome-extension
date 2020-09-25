import React, { useState, useCallback, useEffect } from 'react';
import useInput from '../../hooks/useInput';
import './style.less';

const WsList = () => {
    const [wsList, setWsList] = useState<any>([]);
    const [input, Input] = useInput();

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

    const deserializeMutation = useCallback((message) => {
        console.log('message', message.data); 
        const data = message.data;
        chrome.devtools.inspectedWindow.eval(`window.deserializeMutation('${data}')`, (result) => {
            console.log('result');
            console.log(result);
        });
    }, []);

    const testLength = useCallback(() => {
        chrome.devtools.inspectedWindow.eval(`window.deserializeMutation(${input})`);
    }, [input]);

    return <div className="ws-list">
        {Input}
        <button onClick={testLength}>test length</button>
        <button onClick={getHar}>getHar()</button>
        {wsList.map(ws => (
            <div className="ws-item" key={ws.id}>
                <div className="message-list">
                    {ws.webSocketMessages.map(message => (
                        <div className="message-item" key={message.time}>
                            <div className="message-type">type: {message.type}</div>
                            <div className="message-data">{message.data}</div>
                            <button onClick={() => deserializeMutation(message)}>还原 mutation</button>
                        </div>
                    ))}
                </div>
                
            </div>
        ))}
    </div>
}

export default WsList;
