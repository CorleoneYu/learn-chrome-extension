import React from 'react';
import ReactDOM from 'react-dom';
import Panel from './Panel';

window.onload = function() {
    ReactDOM.render(<Panel />, document.getElementById('panel'));
}
