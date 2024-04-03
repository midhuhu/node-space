/*
 * @FilePath        : /node-space/controller/user.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 用户数据处理
 * @Date            : 2024-03-25 15:27:01
 * @LastEditTime    : 2024-04-03 10:54:11
 * @Copyright (c) 2024 by zhijiasoft.
 */

import { Response } from 'express';
import BaseResult from '../types/base-result';
import { dbService } from '../app';

class UserController {
    /**
     * 获取用户信息:id
     * @param req
     * @param res
     */
    getUserById = async (res: Response, id: string) => {
        const result = (await dbService.query('saas_user', [], 'id = ? AND status = 1', [
            id,
        ])) as any[];
        if (result.length === 0) return res.send(BaseResult.fail('用户不存在！'));
        return result[0];
    };
}

export const userController = new UserController();
