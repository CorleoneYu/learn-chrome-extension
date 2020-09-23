import React, { useState, useCallback, useEffect } from 'react';

const WsList = () => {
    // const [requestList, setRequestList] = useState<any>([]);
    // const handleRequest = useCallback((request) => {
    //     if (request._resourceType === "websocket") {
    //         console.log('websocket', request);
    //         setRequestList((requestList) => [
    //             ...requestList,
    //             request,
    //         ]);
    //     }
    // }, [setRequestList]);

    // useEffect(() => {
    //     chrome.devtools.network.onRequestFinished.addListener(handleRequest);
    //     return () => {
    //         chrome.devtools.network.onRequestFinished.removeListener(handleRequest);
    //     }
    // }, [handleRequest]);

    // const handleClick = useCallback(() => {
    //     console.log('click', requestList);
    // }, [requestList]);

    return <div className="ws-list">
        xxx
    </div>
}

export default WsList;
