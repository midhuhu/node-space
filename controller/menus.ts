/*
 * @FilePath        : /node-space/controller/menus.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 菜单路由控制器
 * @Date            : 2024-03-27 10:00:40
 * @LastEditTime    : 2024-03-27 10:19:16
 * @Copyright (c) 2024 by zhijiasoft.
 */
import { Request, Response } from 'express';
import BaseResult from '../types/base-result';

class MenusController {
    // 获取用户信息
    getMenusByUser = async (req: Request, res: Response) => {
        // ...内部的具体获取逻辑
        console.log(req.body);
        return res.send(BaseResult.success('获取成功！'));
    };
}

// 创建一个上述类的一个实例，将其导出
export const menusController = new MenusController();
