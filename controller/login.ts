/*
 * @FilePath        : /node-space/controller/login.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 登录数据处理
 * @Date            : 2024-03-26 10:13:32
 * @LastEditTime    : 2024-03-26 17:52:08
 * @Copyright (c) 2024 by zhijiasoft.
 */

import { executeQuery } from '../database';
import BaseResult from '../utils/base-result';
import { getCaptcha } from '../utils/get-captcha';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';

class LoginController {
    // 注册
    register = async (req: any, res: any) => {
        // ...内部的具体注册逻辑
    };

    // 登录
    login = async (req: any, res: any) => {
        // ... 内部的具体登录逻辑
        const { username, password, captchaId, captcha } = req.body;
        // 判断验证码
        if (captchaId && captcha) {
            // 验证码过期要根据expire_time判断

            const sql = 'select * from saas_captcha where captcha_id = ?';
            const result = (await executeQuery(sql, [captchaId])) as any;
            console.log(result[0].expire_time, dayjs().format());

            if (result[0].expire_time < dayjs().subtract(8, 'hours').format()) {
                return res.send(BaseResult.fail('验证码已过期'));
            }
            if (result[0].captcha !== captcha) {
                return res.send(BaseResult.fail('验证码错误'));
            }
        }
        res.send(BaseResult.success('登录成功'));
    };

    // 获取验证码
    getCaptcha = async (req: any, res: any) => {
        // ... 内部的具体获取验证码逻辑
        const { img, code } = await getCaptcha(req, res);
        const captchaId = nanoid();

        try {
            // 存储验证码
            const sql =
                'insert into saas_captcha (create_time, expire_time, captcha_id, captcha) values (?, ?, ?, ?)';
            const create_time = dayjs().format();
            const expire_time = dayjs().add(0.1, 'minutes').format();
            console.log(12, create_time, expire_time);

            await executeQuery(sql, [create_time, expire_time, captchaId, code]);
        } catch (err) {
            return res.send(BaseResult.fail(err));
        }

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
