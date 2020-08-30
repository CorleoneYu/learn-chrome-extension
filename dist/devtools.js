chrome.devtools.panels.create(
    'Sheet',
    './icon.png',
    './panel.html',
    function(panel) {
        console.log('panel', panel);
    }
)
