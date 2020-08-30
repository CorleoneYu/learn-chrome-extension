chrome.devtools.panels.create(
    'Sheet',
    './regular.png',
    './panel.html',
    function(panel) {
        console.log('panel', panel);
    }
)
