/*
 * @FilePath        : /node-space/controller/login.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 登录数据处理
 * @Date            : 2024-03-26 10:13:32
 * @LastEditTime    : 2024-03-27 15:18:31
 * @Copyright (c) 2024 by zhijiasoft.
 */
import { Request, Response } from 'express';
import { executeQuery } from '../utils/mysql';
import BaseResult from '../types/base-result';
import { getCaptcha } from '../utils/get-captcha';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';
import snowFlake from '../utils/snow-flake';

class LoginController {
    // 注册
    register = async (req: Request, res: Response) => {
        // ...内部的具体注册逻辑
    };

    // 登录
    login = async (req: Request, res: Response) => {
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
                const sql = 'SELECT * FROM saas_user WHERE username = ? and status = 1';
                const result = (await executeQuery(sql, [username])) as any;

                // 效验用户名密码
                if (result.length === 0 || !bcrypt.compareSync(password, result[0].password)) {
                    return res.send(BaseResult.fail('用户名或密码错误'));
                }

                // 查询用户信息
                const userSql =
                    'SELECT id, username, nickname, avatar_id, mobile, email, status, default_tenant_id, post, gender  FROM saas_user where username = ?';
                const userResult = (await executeQuery(userSql, [username])) as any;
                console.log(userResult[0]);

                // 生成token--jsonwebtoken
                const tokenInfo = {
                    tenantId: userResult[0].default_tenant_id,
                    userId: userResult[0].id,
                };
                const token = jwt.sign(tokenInfo, config.secret, {
                    expiresIn: 1000 * 60 * 60 * 24 * 7, // 7天
                });

                // 存储token
                const tokenSql = 'INSERT INTO `saas_token` VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
                const tokenSqlInfo = [
                    snowFlake.nextId(),
                    dayjs().format('YYYY-MM-DD HH:mm:ss'),
                    dayjs().format('YYYY-MM-DD HH:mm:ss'),
                    1,
                    tokenInfo.userId,
                    token,
                    'saas-user',
                    dayjs().add(7, 'days').format('YYYY-MM-DD HH:mm:ss'),
                    tokenInfo.tenantId,
                ];
                await executeQuery(tokenSql, tokenSqlInfo);

                const postData = {
                    accessToken: token,
                    expire: dayjs().add(7, 'days').valueOf(),
                    user: userResult[0],
                };
                return res.send(BaseResult.success(postData));
            }
            return res.send(BaseResult.fail('登录失败！请检查用户信息！'));
        } catch (error) {
            console.log(error);

            return res.send(BaseResult.fail('登录异常！请稍后尝试！'));
        }
    };

    // 获取验证码
    getCaptcha = async (req: Request, res: Response) => {
        // ... 内部的具体获取验证码逻辑
        const { img, code } = await getCaptcha(req, res);
        const captchaId = nanoid();

        try {
            // 存储验证码
            const sql =
                'INSERT INTO `saas_captcha` (create_time, expire_time, captcha_id, captcha) VALUES (?, ?, ?, ?)';
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
