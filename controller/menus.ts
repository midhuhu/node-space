/*
 * @FilePath        : /node-space/controller/menus.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 菜单路由控制器
 * @Date            : 2024-03-27 10:00:40
 * @LastEditTime    : 2024-03-27 16:55:54
 * @Copyright (c) 2024 by zhijiasoft.
 */
import { Request, Response } from 'express';
import BaseResult from '../types/base-result';

class MenusController {
    /**
     * 获取用户信息:id
     */
    getMenusByUser = async (req: Request, res: Response) => {
        console.log(req.body);
        return res.send(BaseResult.success('获取成功！'));
    };
}

export const menusController = new MenusController();
