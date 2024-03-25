import { Request, Response } from 'express';

class UserController {
	// 注册
	register = async (req: Request, res: Response) => {
        // ...内部的具体注册逻辑
	};

	// 登录
	login = async (req: Request, res: Response) => {
     	// ... 内部的具体登录逻辑
	};
}

// 创建一个上述类的一个实例，将其导出
export const userController = new UserController();
