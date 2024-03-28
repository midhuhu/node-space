/*
 * @FilePath        : /node-space/routes/organization.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 组织架构路由
 * @Date            : 2024-03-28 15:37:21
 * @LastEditTime    : 2024-03-28 15:40:44
 * @Copyright (c) 2024 by zhijiasoft.
 */

import express from 'express';
import { organizationController } from '../controller/index';
const router = express.Router();

router.get('/saas/api/v1/organization/tree/list', organizationController.getTree);

export default router;
