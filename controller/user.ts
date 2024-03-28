/*
 * @FilePath        : /node-space/controller/user.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 用户数据处理
 * @Date            : 2024-03-25 15:27:01
 * @LastEditTime    : 2024-03-28 16:11:32
 * @Copyright (c) 2024 by zhijiasoft.
 */

import { Request, Response } from 'express';
import { executeQuery } from '../utils/mysql';
import BaseResult from '../types/base-result';

class UserController {
    /**
     * 获取用户信息:id
     * @param req
     * @param res
     */
    getUserById = async (res: Response, id: string) => {
        const selectUserSql = 'SELECT * FROM `saas_user` WHERE id = ? AND status = 1';
        const result = (await executeQuery(selectUserSql, [id])) as any[];
        if (result.length === 0) return res.send(BaseResult.fail('用户不存在！'));
        return result[0];
    };
}

export const userController = new UserController();
