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

window.addEventListener('message', function (e) {
    console.log('content received window', e.data);

    switch (e.data.type) {
        case EVENT_TYPE.SEND_INJECT_CONTENT:
            // inject 将 sheet 发送给 panel
            // content-script 在中间做转发
            const msg = {
                ...e.data,
                type: EVENT_TYPE.SEND_CONTENT_PANEL,
            }
            chrome.runtime.sendMessage(msg);
            break;
        default:
            break;
    }
});
