/*
 * @FilePath        : /node-space/controller/login.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 登录数据处理
 * @Date            : 2024-03-26 10:13:32
 * @LastEditTime    : 2024-03-26 15:24:50
 * @Copyright (c) 2024 by zhijiasoft.
 */

import BaseResult from '../utils/base-result';
import { getCaptcha } from '../utils/get-captcha';
import { nanoid } from 'nanoid';

class LoginController {
    // 注册
    register = async (req: any, res: any) => {
        // ...内部的具体注册逻辑
    };

    // 登录
    login = async (req: any, res: any) => {
        // ... 内部的具体登录逻辑
        res.send(BaseResult.success('登录成功'));
    };

    // 获取验证码
    getCaptcha = async (req: any, res: any) => {
        // ... 内部的具体获取验证码逻辑
        const { img, code } = await getCaptcha(req, res);
        const captchaId = nanoid();

        res.send(
            BaseResult.success({
                imgPath: img,
                captchaId: captchaId,
            }),
        );
    };
}

// 创建一个上述类的一个实例，将其导出
export const loginController = new LoginController();
