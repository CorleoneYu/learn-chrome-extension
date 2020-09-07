import { EVENT_TYPE } from './constant/event';
/**
 * 向页面注入 inject.js
 */
(function injectScript(file, node) {
    console.log('injectScript', file);
    const th = document.getElementsByTagName(node)[0];
    const s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
})(chrome.extension.getURL('/js/inject.js'), 'body');

let responseHandle: (response?: any) => void;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('content received chrome', request);

    switch (request.type) {
        case EVENT_TYPE.SEND_PANEL_CONTENT:
            // panel 向 inject 查询 sheet
            // content-script 在中间做转发
            responseHandle = sendResponse;
            const msg = {
                ...request,
                type: EVENT_TYPE.SEND_CONTENT_INJECT,
            };
            window.postMessage(msg, '*');
            break;

        default:
            break;
    }
});

window.addEventListener('message', function (e) {
    console.log('content received window', e.data);

    switch (e.data.type) {
        case EVENT_TYPE.RESPONSE_INJECT_CONTENT:
            // inject 将 sheet 发送给 panel
            // content-script 在中间做转发
            const msg = {
                ...e.data,
                type: EVENT_TYPE.RESPONSE_CONTENT_PANEL,
            }
            responseHandle(msg);
            break;
        default:
            break;
    }
});
