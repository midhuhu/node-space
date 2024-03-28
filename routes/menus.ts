/*
 * @FilePath        : /node-space/routes/menus.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 菜单路由
 * @Date            : 2024-03-27 10:00:06
 * @LastEditTime    : 2024-03-28 16:43:58
 * @Copyright (c) 2024 by zhijiasoft.
 */
import express from 'express';
import { menusController } from '../controller/index';
const router = express.Router();

router.get('/saas/api/v1/menu/get_menus_by_user/:id', menusController.getMenusByUser);
router.get('/saas/api/v1/menu/tree/list', menusController.getMenuTree);

export default router;
