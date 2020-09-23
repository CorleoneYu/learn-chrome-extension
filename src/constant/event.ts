// 标志 哪个页面 -> 哪个页面
export enum EVENT_TYPE {
    SEND_INJECT_CONTENT = 'inject-send-to-content',
    SEND_CONTENT_PANEL = 'content-send-to-panel',
}

// 标志 inject 中发送的数据类型
export enum DATA_TYPE {
    CELL_INFO = 'cell-info', // 普通 sheet 用
    DATABASE = 'database', // doc-x 用
}