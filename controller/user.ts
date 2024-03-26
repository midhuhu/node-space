/*
 * @FilePath        : /node-space/controller/user.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 用户数据处理
 * @Date            : 2024-03-25 15:27:01
 * @LastEditTime    : 2024-03-26 10:11:10
 * @Copyright (c) 2024 by zhijiasoft.
 */
import { Request, Response } from 'express';

class UserController {
	// 获取用户信息
	get = async (req: Request, res: Response) => {
        // ...内部的具体获取逻辑
	};

}


// 创建一个上述类的一个实例，将其导出
export const userController = new UserController();
