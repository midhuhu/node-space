/*
 * @FilePath        : /node-space/controller/permission.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 页面权限按钮管理
 * @Date            : 2024-03-28 16:40:37
 * @LastEditTime    : 2024-04-03 15:19:07
 * @Copyright (c) 2024 by zhijiasoft.
 */
import { Response } from 'express';
import { dbService } from '../app';
import { ReqExpress } from '../types';
import BaseResult from '../types/base-result';

class PermissionController {
    /**
     * 获取权限按钮信息:id
     * @param req
     * @param res
     */
    queryPermissionsById = async (id: string) => {
        const postData = (
            (await dbService.query('saas_button', [], 'menu_id = ?', [id])) as any[]
        ).map((item) => {
            return {
                id: item.id,
                name: item.name,
                code: item.code,
                menuId: item.menu_id,
                nodeType: 'button',
                sort: item.sort,
            };
        });
        return postData;
    };
    /**
     * 获取权限按钮列表
     * @param req
     * @param res
     */
    queryPermissions = async (req: ReqExpress, res: Response) => {
        console.log(111111);
        try {
            const menuId = req.query.menuId;
            const search = req.query.search;
            const page = Number(req.query.page);
            const pageSize = Number(req.query.pageSize);
            const result = await dbService.query(
                'saas_button',
                [],
                '',
                [],
                { menu_id: menuId, name: search },
                page,
                pageSize,
            );
            if (result.data.length === 0) return res.send(BaseResult.success('暂无数据'));
            return res.send(BaseResult.success({ data: result.data, total: result.total }));
        } catch (error) {
            return res.send(BaseResult.fail('失败:' + error));
        }
    };
}

export const permissionController = new PermissionController();
