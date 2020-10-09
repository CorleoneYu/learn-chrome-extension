import React, { useCallback } from 'react';

export interface IMessageListProps {
    messageList: any[];
    showHeartBeat: boolean;
}

const formateData = (dataStr: string) => {
    try {
        const data = JSON.parse(dataStr.slice(11, -3));

    } catch (err) {
        console.error('err', err);
        return dataStr;
    }
}
const MessageList = (props: IMessageListProps) => {
    const { messageList, showHeartBeat } = props;

    const deserializeMutation = useCallback((message) => {
        console.log('message', message.data);
        const data = message.data;
        chrome.devtools.inspectedWindow.eval(`window.deserializeMutation('${data}')`, (result) => {
            console.log('result');
            console.log(result);
        });
    }, []);

    /**
     * 根据条件是否展示该条 message
     */
    const showMessage = useCallback(
        (message: any) => {
            // 心跳包信息长度为 1
            if (message.data.length === 1 && !showHeartBeat) {
                return false;
            }

            return true;
        },
        [showHeartBeat],
    );

    const renderData = useCallback(
        (message: any) => {
            const show = showMessage(message);

            return show ? (
                <div className="message-item" key={message.time}>
                    <div className="message-type">type: {message.type}</div>
                    <div className="message-data">{message.data}</div>
                    <button onClick={() => deserializeMutation(message)}>还原 mutation</button>
                </div>
            ) : null;
        },
        [showMessage, deserializeMutation],
    );

    return <div className="message-list">{messageList.map((message) => renderData(message))}</div>;
};
export default MessageList;
