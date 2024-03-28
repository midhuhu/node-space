/*
 * @FilePath        : /node-space/utils/common.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 公共方法
 * @Date            : 2024-03-28 09:45:27
 * @LastEditTime    : 2024-03-28 17:06:37
 * @Copyright (c) 2024 by zhijiasoft.
 */

/**
 * 扁平数据树转换为父子结构
 * @param parentId
 * @param allItems
 * @param level
 * @returns
 */
export const queryMenuItems = (parentId: number | string, allItems: any[], level = 0) => {
    const items = allItems.filter((item) => item.parent_id === parentId);
    items.forEach((item) => {
        item.children = queryMenuItems(item.id, allItems, level + 1);
    });
    return items;
};
