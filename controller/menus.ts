/*
 * @FilePath        : /node-space/controller/menus.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 菜单路由控制器
 * @Date            : 2024-03-27 10:00:40
 * @LastEditTime    : 2024-03-28 10:17:57
 * @Copyright (c) 2024 by zhijiasoft.
 */
import { Request, Response } from 'express';
import BaseResult from '../types/base-result';
import { executeQuery } from '../utils/mysql';
import { queryMenuItems } from '../utils/common';

class MenusController {
    /**
     * 获取用户信息:id
     */
    getMenusByUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const selectUserSql = 'SELECT * FROM `saas_user` WHERE id = ? AND status = 1';
            const result = (await executeQuery(selectUserSql, [id])) as any[];
            if (result.length === 0) return res.send(BaseResult.fail('用户不存在！'));
            if (result[0].is_superuser) {
                /**
                 * 超级管理员 返回所有菜单
                 */
                const selectMenusSql = 'SELECT * FROM `saas_menu`';
                const menus = (await executeQuery(selectMenusSql, [])) as any[];

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
}

export const menusController = new MenusController();
