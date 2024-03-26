/*
 * @FilePath        : /node-space/routes/login.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 登录接口路由
 * @Date            : 2024-03-25 15:00:34
 * @LastEditTime    : 2024-03-26 13:53:33
 * @Copyright (c) 2024 by zhijiasoft.
 */

import express from 'express';
import { loginController } from '../controller/index';
const router = express.Router();

router.get('/saas/api/v1/captcha', loginController.getCaptcha);
router.post('/saas/api/v1/auth/login', loginController.login);

export default router;
