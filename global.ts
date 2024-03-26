/*
 * @FilePath        : /node-space/global.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 类型定义
 * @Date            : 2024-03-26 13:39:30
 * @LastEditTime    : 2024-03-26 13:39:31
 * @Copyright (c) 2024 by zhijiasoft.
 */
declare module 'global' {
    interface Global {
        __DEV__: boolean;
    }
}
