/*
 * @FilePath        : /node-space/routes/index.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 路由管理 统一导出
 * @Date            : 2024-03-25 16:57:55
 * @LastEditTime    : 2024-04-03 14:23:06
 * @Copyright (c) 2024 by zhijiasoft.
 */
import LoginRouter from './login';
import UsersRouter from './users';
import MenusRouter from './menus';
import PermissionRouter from './permission';

export { LoginRouter, UsersRouter, MenusRouter, PermissionRouter };
