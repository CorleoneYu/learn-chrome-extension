chrome.devtools.panels.create(
    'Sheet',
    './icon.png',
    './panel.html',
    function(panel) {
        // console.log('panel', panel);
    }
)

// window.requestList = [];
// chrome.devtools.network.onRequestFinished.addListener(function(request) {
//     // @ts-ignore
//     if (request._resourceType === "websocket") {
//         console.log('websocket', request);
//         window.requestList.push(request);
//     }
// });
