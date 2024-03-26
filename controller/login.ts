/*
 * @FilePath        : /node-space/controller/login.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 登录数据处理
 * @Date            : 2024-03-26 10:13:32
 * @LastEditTime    : 2024-03-26 10:15:02
 * @Copyright (c) 2024 by zhijiasoft.
 */

import { Request, Response } from 'express';
import BaseResult from '../utils/base-result';

class LoginController {
	// 注册
	register = async (req: Request, res: Response) => {
        // ...内部的具体注册逻辑
	};

	// 登录
	login = async (req: Request, res: Response) => {
     	// ... 内部的具体登录逻辑
		res.send(BaseResult.success('登录成功'));
	};
}


// 创建一个上述类的一个实例，将其导出
export const loginController = new LoginController();
