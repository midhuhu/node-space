/*
 * @FilePath        : /node-space/types/index.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 公共类型
 * @Date            : 2024-03-28 15:59:57
 * @LastEditTime    : 2024-03-28 16:03:34
 * @Copyright (c) 2024 by zhijiasoft.
 */

import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

/**
 * token jwt
 */
export interface TokenJWT extends jwt.JwtPayload {
    userId: string;
}

/**
 * 请求对象
 */
export interface ReqExpress extends Request {
    userId?: string;
}

/**
 * 响应对象
 */
export interface ResExpress extends Response {
    userId?: string;
}
