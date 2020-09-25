import { EVENT_TYPE, DATA_TYPE } from './constant/event';

console.log('inject!!!');

declare const window: any;

/**
 * 获取 sheet 上 activeSheet 特定某个单元格数据
 * @param row 行
 * @param column 列
 */
window.getCellData = function (row: number, column: number) {
    const cellData = window.SpreadsheetApp.spreadsheet.activeSheet.data.rowData[row].values[column];
    const cellView = window.SpreadsheetApp.view.canvas.tableView._cellViews[row][column];
    console.log('getCellData', row, column, cellData, cellView);
    const msg = {
        cellData,
        cellView,
    };

    return msg;
};

window.getDatabase = function (index: number) {
    const anchorId = window.pad.editor.onDocument().getInlinePlugins().item(index).getAttributes().anchorId as string;
    const [sheetId, viewId] = anchorId.split('_');
    const sheetData = window.SpreadsheetApp.spreadsheet.getSheetBySheetId(sheetId).data;
    const viewData = window.SpreadsheetApp.databaseViewManager.stageManager.getDatabaseViewByViewId(viewId).subView.view
        .canvas.tableView.cellViews;
    const viewOptions = window.SpreadsheetApp.spreadsheet.viewManager.getViewByViewId(viewId);

    console.log('getDatabase', anchorId, sheetId, viewId, sheetData, viewData, viewOptions);

    const msg = {
        sheetId,
        viewId,
        sheetData,
        viewData,
        viewOptions,
    };
    return msg;
};

window.deserializeMutation = function (data: string) {
    console.log('deserializeMutation', data);
    return window.SpreadsheetApp.tools.deserializeMutation.toString();
};
