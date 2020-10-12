/**
 * 判断是否为心跳包
 * @param data 包数据
 */
export const isHeartBeat = (data: string) => {
    if (data.length <= 2) {
        return true;
    }

    return data.includes('HEART_BEAT');
}


/**
 * 判断是否为 user changes
 */
export const isUserChanges = (data: string) => {
    return data.includes('USER_CHANGES');
}
