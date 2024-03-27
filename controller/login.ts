/*
 * @FilePath        : /node-space/controller/login.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 登录数据处理
 * @Date            : 2024-03-26 10:13:32
 * @LastEditTime    : 2024-03-27 10:38:47
 * @Copyright (c) 2024 by zhijiasoft.
 */

import { executeQuery } from '../database';
import BaseResult from '../utils/base-result';
import { getCaptcha } from '../utils/get-captcha';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';

class LoginController {
    // 注册
    register = async (req: any, res: any) => {
        // ...内部的具体注册逻辑
    };

    // 登录
    login = async (req: any, res: any) => {
        // ... 内部的具体登录逻辑
        const { username, password, captchaId, captcha } = req.body;
        try {
            // 判断验证码
            if (captchaId && captcha) {
                const sql = 'select * from saas_captcha where captcha_id = ?';
                const result = (await executeQuery(sql, [captchaId])) as any;

                // 效验验证码
                if (
                    result.length === 0 ||
                    (result.length > 0 && result[0].captcha !== captcha) ||
                    result[0].expire_time < dayjs().format('YYYY-MM-DD HH:mm:ss')
                ) {
                    return res.send(BaseResult.fail('验证码错误'));
                }

                // 删除效验过的验证码
                const delSql = 'delete from saas_captcha where captcha_id = ?';
                executeQuery(delSql, [captchaId]);
            }

            if (username && password) {
                const sql = 'select * from saas_user where username = ? and status = 1';
                const result = (await executeQuery(sql, [username])) as any;

                // 效验用户名密码
                if (result.length === 0 || !bcrypt.compareSync(password, result[0].password)) {
                    return res.send(BaseResult.fail('用户名或密码错误'));
                }

                // // 查询用户信息
                // const userSql =
                //     'select { id, username, nickname, avatar, mobile, email, status, defaultTenantId, post, gender } from saas_user where username = ?';
                // const userResult = (await executeQuery(userSql, [username])) as any;

                // // 生成token--jsonwebtoken

                // const resData = {
                //     accessToken: 'xx',
                //     expire: '11111',
                //     user: userResult[0],
                // };
                // return res.send(BaseResult.success(resData));
                return res.send(BaseResult.success('登录成功'));
            }
            return res.send(BaseResult.fail('登录失败！请检查用户信息！'));
        } catch (error) {
            console.log(error);

            return res.send(BaseResult.fail('登录异常！请稍后尝试！'));
        }
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
            const create_time = dayjs().format('YYYY-MM-DD HH:mm:ss');
            const expire_time = dayjs().add(5, 'minutes').format('YYYY-MM-DD HH:mm:ss');

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
