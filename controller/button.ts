/*
 * @FilePath        : /node-space/controller/button.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 页面按钮管理
 * @Date            : 2024-03-28 16:40:37
 * @LastEditTime    : 2024-04-03 10:52:12
 * @Copyright (c) 2024 by zhijiasoft.
 */

import { dbService } from '../app';

class ButtonController {
    /**
     * 获取按钮信息:id
     * @param req
     * @param res
     */
    getButtonsByMenu = async (id: string) => {
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
}

export const buttonController = new ButtonController();
