/*
 * @FilePath        : /node-space/utils/get-captcha.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 获取验证码图片base64
 * @Date            : 2024-03-26 10:38:56
 * @LastEditTime    : 2024-03-26 15:11:48
 * @Copyright (c) 2024 by zhijiasoft.
 */

import { Request, Response } from 'express';
//@ts-ignore
import captchaPng from 'captchapng';

export const getCaptcha = (req: Request, res: Response) => {
    // 生成验证码
    const str = parseInt(String(Math.random() * 9000 + 1000)); //随机生成数字
    const code = new captchaPng(80, 30, str);
    code.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
    code.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
    const imgBase64 = 'data:image/png;base64,' + code.getBase64();
    return { img: imgBase64, code: str };
};
