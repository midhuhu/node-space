/*
 * @FilePath        : /node-space/utils/common.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 公共方法
 * @Date            : 2024-03-28 09:45:27
 * @LastEditTime    : 2024-04-03 13:43:08
 * @Copyright (c) 2024 by zhijiasoft.
 */

import { MenuItem } from '../types/index';
import { buttonController } from '../controller';

// 构建菜单树形结构并填充权限数据
export async function buildTreeWithPermissions(data: MenuItem[]): Promise<MenuItem[]> {
    const itemMap = new Map<string, MenuItem>();
    data.forEach((item) => {
        item.children = [];
        itemMap.set(item.id, item);
    });

    for (const item of data) {
        if (item.parent_id) {
            itemMap.get(item.parent_id)?.children?.push(item);
        }
    }

    // 查询并添加权限数据
    for (const item of data) {
        item.permissions = await buttonController.queryPermissionsById(item.id);
    }

    return data.filter((item) => !item.parent_id); // 返回根节点列表
}
