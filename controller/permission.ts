/*
 * @FilePath        : /node-space/controller/permission.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 页面权限按钮管理
 * @Date            : 2024-03-28 16:40:37
 * @LastEditTime    : 2024-04-03 16:11:09
 * @Copyright (c) 2024 by zhijiasoft.
 */
import { Response } from 'express';
import { dbService } from '../app';
import { ReqExpress } from '../types';
import BaseResult from '../types/base-result';
import { nanoid } from 'nanoid';
import snowFlake from '../utils/snow-flake';
import dayjs from 'dayjs';

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
            return res.send(BaseResult.success({ data: result.data, total: result.total }));
        } catch (error) {
            return res.send(BaseResult.fail('失败:' + error));
        }
    };
    /**
     * 创建数据
     */
    create = async (req: ReqExpress, res: Response) => {
        try {
            const { name, code, menuId } = req.body;
            const result = await dbService.insert('saas_button', {
                id: snowFlake.nextId(),
                created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                name,
                code,
                menu_id: menuId,
            });
            return res.send(BaseResult.success(result));
        } catch (error) {
            return res.send(BaseResult.fail('失败:' + error));
        }
    };
    /**
     * 更新数据
     */
    update = async (req: ReqExpress, res: Response) => {
        try {
            const { id, name, code, menuId } = req.body;
            await dbService.update(
                'saas_button',
                {
                    name,
                    code,
                    menu_id: menuId,
                    updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                },
                'id = ?',
                [id],
            );
            return res.send(BaseResult.success('更新成功'));
        } catch (error) {
            return res.send(BaseResult.fail('失败:' + error));
        }
    };
    /**
     * 删除数据
     * body:{ids:['xxx','xxx']}
     */
    delete = async (req: ReqExpress, res: Response) => {
        try {
            const { ids } = req.body;
            ids.forEach(async (item: any) => {
                await dbService.delete('saas_button', 'id = ?', [item]);
            });
            return res.send(BaseResult.success('删除成功'));
        } catch (error) {
            return res.send(BaseResult.fail('失败:' + error));
        }
    };
}

export const permissionController = new PermissionController();
