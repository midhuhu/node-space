/*
 * @FilePath        : /node-space/utils/common.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 公共方法
 * @Date            : 2024-03-28 09:45:27
 * @LastEditTime    : 2024-04-07 11:14:23
 * @Copyright (c) 2024 by zhijiasoft.
 */
import os from 'os';
import { MenuItem } from '../types/index';
import { permissionController } from '../controller';

/**
 * 构建菜单树形结构并填充权限数据
 * @param data  MenuItem[]
 * @returns
 */
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
        item.permissions = await permissionController.queryPermissionsById(item.id);
    }

    return data.filter((item) => !item.parent_id); // 返回根节点列表
}

/**
 * 获取本地 IP 地址
 * @returns 本地 IP 地址
 */
export function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const interfaceName in interfaces) {
        const addresses = interfaces[interfaceName] || [];
        for (const address of addresses) {
            if (address.family === 'IPv4' && !address.internal) {
                return address.address;
            }
        }
    }
    return '127.0.0.1';
}
