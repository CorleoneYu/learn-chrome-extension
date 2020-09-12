import { EVENT_TYPE } from './constant/event';

console.log('inject!!!');

declare const window: any;

window.getCellData = function(row: number, column: number) {
    const cellData = window.SpreadsheetApp.spreadsheet.activeSheet.data.rowData[row].values[column];
    const cellView = window.SpreadsheetApp.view.canvas.tableView._cellViews[row][column];
    console.log('getCellData', row, column, cellData, cellView);
    const msg = {
        type: EVENT_TYPE.SEND_INJECT_CONTENT,
        payload: {
            cellData,
            cellView,
        },
    };

    eval(window.postMessage(msg, '*'));
}
