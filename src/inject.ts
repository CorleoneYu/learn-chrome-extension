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

function getDatabase(sheetId: string, viewId: string) {
    const sheetData = window.SpreadsheetApp.spreadsheet.getSheetBySheetId(sheetId).data;
    const canvas = window.SpreadsheetApp.databaseViewManager.getDatabaseViewByViewId(viewId).view.view.canvas;
    const viewData = {
        cellViews: canvas.tableView.cellViews,
        rowData: canvas._rowcolAccessor._rowData,
        areaTop: canvas._areaData._row._flow._areaTop,
    };
    const viewOptions = window.SpreadsheetApp.spreadsheet.viewManager.getViewByViewId(viewId);
    console.log('getDatabase', sheetId, viewId, sheetData, viewData, viewOptions);

    const msg = {
        sheetId,
        viewId,
        sheetData,
        viewData,
        viewOptions,
    };
    return msg;
};

window.getDatabaseByIndex = function(index: number) {
    const anchorId = window.pad.editor.onDocument().getInlinePlugins().item(index).getAttributes().anchorId as string;
    const [sheetId, viewId] = anchorId.split('_');
    return getDatabase(sheetId, viewId);
}

window.getActiveDatabase = function() {
    const sheetId = window.SpreadsheetApp.spreadsheet.getActiveSheetId();
    const viewId = window.SpreadsheetApp.spreadsheet.viewManager.activeView.viewId;
    return getDatabase(sheetId, viewId);
}

/**
 * 格式化 userChanges 为“易读”数据
 * @param data 形如 42["post", "head"\n"body"] 的字符串
 * @return changeset mutation[][] 二维数组
 */
function formatUserChanges(data: string) {
    try {
        const index = data.indexOf('\n');
        const body = data.slice(index + 1, -2);
        const parsedBody = JSON.parse(body);
        return JSON.parse(parsedBody.changeset);
    } catch (err) {
        console.log('err', err);
    }
    
}

window.deserializeMutation = function (data: string) {
    console.log('deserializeMutation', data);
    const changeSetArray = formatUserChanges(data);
    const mutationArray = [];
    changeSetArray.forEach(function (cs) {
        // cs 是 mutation[]
        cs.forEach(function(mutation) {
            const result = window.SpreadsheetApp.tools.deserializeMutation(mutation);
            const name = result.constructor.name;
            result.mutationName = name;
            mutationArray.push(result);
        });
    });
    return mutationArray;
};
