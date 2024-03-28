/*
 * @FilePath        : /node-space/controller/menus.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 菜单路由控制器
 * @Date            : 2024-03-27 10:00:40
 * @LastEditTime    : 2024-03-28 16:41:41
 * @Copyright (c) 2024 by zhijiasoft.
 */
import { Request, Response } from 'express';
import BaseResult from '../types/base-result';
import { executeQuery } from '../utils/mysql';
import { queryMenuItems } from '../utils/common';
import { userController } from './user';
import { ReqExpress } from '../types';

class MenusController {
    /**
     * 获取菜单信息:id
     */
    getMenuById = async (res: Response, id?: string): Promise<any> => {
        const sql = `SELECT * FROM saas_menu ${id && 'WHERE id = ?'}`;

        const result = (await executeQuery(sql, id && [id])) as any[];
        if (result.length === 0) return res.send(BaseResult.fail('菜单不存在！'));

        return result;
    };

    /**
     * 获取用户绑定菜单
     */
    getMenusByUser = async (req: ReqExpress, res: Response) => {
        try {
            const id = req.params.id || req.userId || '';
            const result = await userController.getUserById(res, id);
            if (result.is_superuser) {
                /**
                 * 超级管理员 返回所有菜单
                 */
                const menus = await this.getMenuById(res, '');

                /**
                 * 菜单返回格式处理
                 */
                const data: any[] = queryMenuItems('', menus) || [];

                return res.send(BaseResult.success({ data: data, total: data.length || 0 }));
            }
            return res.send(BaseResult.fail('获取菜单失败！'));
        } catch (error) {
            return res.send(BaseResult.systemError('系统繁忙！请稍后重试！'));
        }
    };
    /**
     * 获取菜单列表Tree
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    getMenuTree = async (req: ReqExpress, res: Response) => {
        try {
            await this.getMenusByUser(req, res);
        } catch (error) {
            return res.send(BaseResult.systemError('系统繁忙！请稍后重试！'));
        }
    };
}

export const menusController = new MenusController();
