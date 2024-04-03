/*
 * @FilePath        : /node-space/controller/index.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 控制器导出
 * @Date            : 2024-03-26 08:16:50
 * @LastEditTime    : 2024-04-03 14:02:46
 * @Copyright (c) 2024 by zhijiasoft.
 */

import { userController } from './user';
import { loginController } from './login';
import { menusController } from './menus';
import { organizationController } from './organization';
import { permissionController } from './permission';

export {
    loginController,
    userController,
    menusController,
    organizationController,
    permissionController,
};
