/*
 * @FilePath        : /node-space/routes/login.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 登录接口路由
 * @Date            : 2024-03-25 15:00:34
 * @LastEditTime    : 2024-03-26 10:12:24
 * @Copyright (c) 2024 by zhijiasoft.
 */

import express from "express";
import { loginController } from "../controller";
const router = express.Router();

router.get("/captcha", loginController.login);
router.get("/login", loginController.login);


export default router;