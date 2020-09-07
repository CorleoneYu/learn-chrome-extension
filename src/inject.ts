import { EVENT_TYPE } from './constant/event';

console.log('inject!!!');
const injectData = {
    name: 'lky',
    age: 12
};

window.addEventListener('message', function (e) {
    console.log('inject received', e.data);

    switch (e.data.type) {
        case EVENT_TYPE.SEND_CONTENT_INJECT:
            const msg = {
                type: EVENT_TYPE.RESPONSE_INJECT_CONTENT,
                payload: {
                    data: {
                        name: 'lky',
                        age: 12,
                    },
                },
            };
            window.postMessage(msg, '*');
        default:
            break;
    }
});
