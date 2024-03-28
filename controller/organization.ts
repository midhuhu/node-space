/*
 * @FilePath        : /node-space/controller/organization.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : organizationController
 * @Date            : 2024-03-28 15:38:32
 * @LastEditTime    : 2024-03-28 15:39:39
 * @Copyright (c) 2024 by zhijiasoft.
 */

import { Request, Response } from 'express';

class OrganizationController {
    /**
     * 获取组织架构tree
     * @param req
     * @param res
     */
    getTree = async (req: Request, res: Response) => {
        // ...内部的具体获取逻辑
    };
}

export const organizationController = new OrganizationController();
