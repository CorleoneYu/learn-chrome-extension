import React, { useCallback } from 'react';
import { isHeartBeat, isUserChanges } from './utils';

export interface IMessageListProps {
    messageList: any[];
    showHeartBeat: boolean;
    onlyUserChanges: boolean; // 仅显示 userChanges 优先级高于 showHeartBeat
    onMutationChange: Function;
}

/**
 * 是否可以进行反序列化
 * 1. type 为 send
 * 2. data 为 user change
 * @param message 
 */
const canDeserialize = (message) => {
    if (message.type === 'send' && isUserChanges(message.data)) {
        return true;
    }

    return false;
}

const MessageList = (props: IMessageListProps) => {
    const { messageList, showHeartBeat, onlyUserChanges, onMutationChange } = props;

    const deserializeMutation = useCallback((message) => {
        const data = message.data;
        chrome.devtools.inspectedWindow.eval(`window.deserializeMutation('${data}')`, (mutationArray) => {
            onMutationChange(mutationArray);
        });
    }, [onMutationChange]);

    /**
     * 根据条件是否展示该条 message
     */
    const showMessage = useCallback(
        (message: any) => {
            // user change 条件
            if (onlyUserChanges && !isUserChanges(message.data)) {
                return false;
            }

            // 心跳包条件
            if (!showHeartBeat && isHeartBeat(message.data)) {
                return false;
            }

            return true;
        },
        [showHeartBeat, onlyUserChanges],
    );

    const renderData = useCallback(
        (message: any) => {
            const show = showMessage(message);

            return show ? (
                <div className="message-item" key={message.time}>
                    <div className="message-type">type: {message.type}</div>
                    <div className="message-data">{message.data}</div>
                    {canDeserialize(message) && <button onClick={() => deserializeMutation(message)}>还原 mutation</button>}
                </div>
            ) : null;
        },
        [showMessage, deserializeMutation],
    );

    return <div className="message-list">{messageList.map((message) => renderData(message))}</div>;
};
export default MessageList;
