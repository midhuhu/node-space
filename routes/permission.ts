/*
 * @FilePath        : /node-space/routes/permission.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 权限按钮设置
 * @Date            : 2024-04-03 13:53:05
 * @LastEditTime    : 2024-04-03 16:09:07
 * @Copyright (c) 2024 by zhijiasoft.
 */

import express from 'express';
const router = express.Router();
import { permissionController } from '../controller';

router.get('/saas/api/v1/button/list', permissionController.queryPermissions);
router.post('/saas/api/v1/button/create', permissionController.create);
router.post('/saas/api/v1/button/update', permissionController.update);
router.post('/saas/api/v1/button/delete', permissionController.delete);

export default router;
