/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/inject.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/inject.ts":
/*!***********************!*\
  !*** ./src/inject.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
console.log('inject!!!');
/**
 * 获取 sheet 上 activeSheet 特定某个单元格数据
 * @param row 行
 * @param column 列
 */
window.getCellData = function (row, column) {
    var cellData = window.SpreadsheetApp.spreadsheet.activeSheet.data.rowData[row].values[column];
    var cellView = window.SpreadsheetApp.view.canvas.tableView._cellViews[row][column];
    console.log('getCellData', row, column, cellData, cellView);
    var msg = {
        cellData: cellData,
        cellView: cellView,
    };
    return msg;
};
function getDatabase(sheetId, viewId) {
    var sheetData = window.SpreadsheetApp.spreadsheet.getSheetBySheetId(sheetId).data;
    var canvas = window.SpreadsheetApp.databaseViewManager.getDatabaseViewByViewId(viewId).view.view.canvas;
    var viewData = {
        cellViews: canvas.tableView.cellViews,
        rowData: canvas._rowcolAccessor._rowData,
        areaTop: canvas._areaData._row._flow._areaTop,
    };
    var viewOptions = window.SpreadsheetApp.spreadsheet.viewManager.getViewByViewId(viewId);
    console.log('getDatabase', sheetId, viewId, sheetData, viewData, viewOptions);
    var msg = {
        sheetId: sheetId,
        viewId: viewId,
        sheetData: sheetData,
        viewData: viewData,
        viewOptions: viewOptions,
    };
    return msg;
}
;
window.getDatabaseByIndex = function (index) {
    var anchorId = window.pad.editor.onDocument().getInlinePlugins().item(index).getAttributes().anchorId;
    var _a = anchorId.split('_'), sheetId = _a[0], viewId = _a[1];
    return getDatabase(sheetId, viewId);
};
window.getActiveDatabase = function () {
    var sheetId = window.SpreadsheetApp.spreadsheet.getActiveSheetId();
    var viewId = window.SpreadsheetApp.spreadsheet.viewManager.activeView.viewId;
    return getDatabase(sheetId, viewId);
};
/**
 * 格式化 userChanges 为“易读”数据
 * @param data 形如 42["post", "head"\n"body"] 的字符串
 * @return changeset mutation[][] 二维数组
 */
function formatUserChanges(data) {
    try {
        var index = data.indexOf('\n');
        var body = data.slice(index + 1, -2);
        var parsedBody = JSON.parse(body);
        return JSON.parse(parsedBody.changeset);
    }
    catch (err) {
        console.log('err', err);
    }
}
window.deserializeMutation = function (data) {
    console.log('deserializeMutation', data);
    var changeSetArray = formatUserChanges(data);
    var mutationArray = [];
    changeSetArray.forEach(function (cs) {
        // cs 是 mutation[]
        cs.forEach(function (mutation) {
            var result = window.SpreadsheetApp.tools.deserializeMutation(mutation);
            var name = result.constructor.name;
            result.mutationName = name;
            mutationArray.push(result);
        });
    });
    return mutationArray;
};


/***/ })

/******/ });
//# sourceMappingURL=inject.js.map