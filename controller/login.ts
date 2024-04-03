/*
 * @FilePath        : /node-space/controller/login.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 登录数据处理
 * @Date            : 2024-03-26 10:13:32
 * @LastEditTime    : 2024-04-03 10:20:36
 * @Copyright (c) 2024 by zhijiasoft.
 */
import { Request, Response, NextFunction } from 'express';
import BaseResult from '../types/base-result';
import { getCaptcha } from '../utils/get-captcha';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';
import snowFlake from '../utils/snow-flake';
import { ReqExpress, TokenJWT } from '../types';
import { dbService } from '../app';

class LoginController {
    /**
     * 登录token效验
     */
    loginCheck = async (req: ReqExpress, res: Response, next: NextFunction) => {
        const token = req.header(config.tokenHeaderKey);
        if (!token) {
            return res.send(BaseResult.fail('用户未登录！'));
        }
        const verified = (await jwt.verify(token, config.secret)) as TokenJWT;
        if (verified) {
            req.userId = verified.userId;
            next();
        } else {
            return res.send(BaseResult.tokenFailed('用户未登录或token无效'));
        }
    };

    /**
     * 注册
     */
    register = async (req: Request, res: Response) => {
        /**
         * 内部的具体注册逻辑
         */
    };

    /**
     * 登录
     */
    login = async (req: Request, res: Response) => {
        const { username, password, captchaId, captcha } = req.body;
        try {
            if (captchaId && captcha) {
                const result = (await dbService.query('saas_captcha', [], 'captcha_id = ?', [
                    captchaId,
                ])) as any;

                /**
                 * 效验验证码
                 */
                if (
                    result.length === 0 ||
                    (result.length > 0 && result[0].captcha !== captcha) ||
                    result[0].expire_time < dayjs().format('YYYY-MM-DD HH:mm:ss')
                ) {
                    return res.send(BaseResult.fail('验证码错误'));
                }

                /**
                 * 删除效验过的验证码
                 */
                await dbService.delete('saas_captcha', 'captcha_id = ?', [captchaId]);
            }

            if (username && password) {
                const result = (await dbService.query(
                    'saas_user',
                    [],
                    'username = ? and status = 1',
                    [username],
                )) as any;

                /**
                 * 效验用户名密码
                 */
                if (result.length === 0 || !bcrypt.compareSync(password, result[0].password)) {
                    return res.send(BaseResult.fail('用户名或密码错误'));
                }

                /**
                 * 查询用户信息
                 */
                const userResult = (await dbService.query(
                    'saas_user',
                    [
                        'id',
                        'username',
                        'nickname',
                        'avatar_id',
                        'mobile',
                        'email',
                        'status',
                        'default_tenant_id',
                        'post',
                        'gender',
                    ],
                    'username = ?',
                    [username],
                )) as any;

                /**
                 * 生成token--jsonwebtoken
                 */
                const tokenInfo = {
                    tenantId: userResult[0].default_tenant_id,
                    userId: userResult[0].id,
                };
                const token = jwt.sign(tokenInfo, config.secret, {
                    expiresIn: 1000 * 60 * 60 * 24 * 7, // 7天
                });

                /**
                 * 存储token
                 */
                const tokenSqlInfo = {
                    id: snowFlake.nextId(),
                    created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                    updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                    status: 1,
                    uid: tokenInfo.userId,
                    token: token,
                    source: 'saas-user',
                    expired_at: dayjs().add(7, 'days').format('YYYY-MM-DD HH:mm:ss'),
                    tenant_id: tokenInfo.tenantId,
                };
                await dbService.insert('saas_token', tokenSqlInfo);

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

    /**
     * 获取验证码
     */
    getCaptcha = async (req: Request, res: Response) => {
        const { img, code } = await getCaptcha(req, res);
        const captchaId = nanoid();

        try {
            /**
             * 存储验证码
             */
            const create_time = dayjs().format('YYYY-MM-DD HH:mm:ss');
            const expire_time = dayjs().add(5, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            await dbService.insert('saas_captcha', {
                create_time: create_time,
                expire_time: expire_time,
                captcha_id: captchaId,
                captcha: code,
            });
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

export const loginController = new LoginController();
