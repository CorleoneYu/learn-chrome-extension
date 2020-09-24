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

/***/ "./src/constant/event.ts":
/*!*******************************!*\
  !*** ./src/constant/event.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DATA_TYPE = exports.EVENT_TYPE = void 0;
// 标志 哪个页面 -> 哪个页面
var EVENT_TYPE;
(function (EVENT_TYPE) {
    EVENT_TYPE["SEND_INJECT_CONTENT"] = "inject-send-to-content";
    EVENT_TYPE["SEND_CONTENT_PANEL"] = "content-send-to-panel";
})(EVENT_TYPE = exports.EVENT_TYPE || (exports.EVENT_TYPE = {}));
// 标志 inject 中发送的数据类型
var DATA_TYPE;
(function (DATA_TYPE) {
    DATA_TYPE["CELL_INFO"] = "cell-info";
    DATA_TYPE["DATABASE"] = "database";
    DATA_TYPE["UNLOAD"] = "unload";
})(DATA_TYPE = exports.DATA_TYPE || (exports.DATA_TYPE = {}));


/***/ }),

/***/ "./src/inject.ts":
/*!***********************!*\
  !*** ./src/inject.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var event_1 = __webpack_require__(/*! ./constant/event */ "./src/constant/event.ts");
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
        type: event_1.EVENT_TYPE.SEND_INJECT_CONTENT,
        payload: {
            type: event_1.DATA_TYPE.CELL_INFO,
            data: {
                cellData: cellData,
                cellView: cellView,
            },
        },
    };
    eval(window.postMessage(msg, '*'));
};
window.getDatabase = function (index) {
    var anchorId = window.pad.editor.onDocument().getInlinePlugins().item(index).getAttributes().anchorId;
    var _a = anchorId.split('_'), sheetId = _a[0], viewId = _a[1];
    var sheetData = window.SpreadsheetApp.spreadsheet.getSheetBySheetId(sheetId).data;
    var viewData = window.SpreadsheetApp.databaseViewManager.stageManager.getDatabaseViewByViewId(viewId).subView.view.canvas.tableView.cellViews;
    var viewOptions = window.SpreadsheetApp.spreadsheet.viewManager.getViewByViewId(viewId);
    console.log('getDatabase', anchorId, sheetId, viewId, sheetData, viewData, viewOptions);
    var msg = {
        type: event_1.EVENT_TYPE.SEND_INJECT_CONTENT,
        payload: {
            type: event_1.DATA_TYPE.DATABASE,
            data: {
                sheetId: sheetId,
                viewId: viewId,
                sheetData: sheetData,
                viewData: viewData,
                viewOptions: viewOptions,
            }
        },
    };
    eval(window.postMessage(msg, '*'));
};
// 刷新时让 panel 清空 websocket 列表
window.addListener('unload', function () {
    var msg = {
        type: event_1.EVENT_TYPE.SEND_INJECT_CONTENT,
        payload: {
            type: event_1.DATA_TYPE.UNLOAD,
        }
    };
    eval(window.postMessage(msg, '*'));
});


/***/ })

/******/ });
//# sourceMappingURL=inject.js.map