/*
 * @FilePath        : /node-space/controller/button.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 页面按钮管理
 * @Date            : 2024-03-28 16:40:37
 * @LastEditTime    : 2024-03-28 16:56:36
 * @Copyright (c) 2024 by zhijiasoft.
 */

import { Response } from 'express';
import { executeQuery } from '../utils/mysql';
import BaseResult from '../types/base-result';

class ButtonController {
    /**
     * 获取按钮信息:id
     * @param req
     * @param res
     */
    getButtonsByMenu = async (id: string) => {
        const sql = `SELECT * FROM saas_button WHERE menu_id = ?`;
        const postData = ((await executeQuery(sql, [id])) as any[]).map((item) => {
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
}

export const buttonController = new ButtonController();
