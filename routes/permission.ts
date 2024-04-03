/*
 * @FilePath        : /node-space/routes/permission.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 权限按钮设置
 * @Date            : 2024-04-03 13:53:05
 * @LastEditTime    : 2024-04-03 14:21:37
 * @Copyright (c) 2024 by zhijiasoft.
 */

import express from 'express';
const router = express.Router();
import { permissionController } from '../controller';

router.get('/saas/api/v1/button/list', permissionController.queryPermissions);

export default router;
