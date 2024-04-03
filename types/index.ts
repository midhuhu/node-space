/*
 * @FilePath        : /node-space/types/index.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 公共类型
 * @Date            : 2024-03-28 15:59:57
 * @LastEditTime    : 2024-04-03 13:41:40
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

/**
 * menu 类型
 */
export interface MenuItem {
    id: string;
    created_at: string;
    updated_at: string;
    sort: number;
    deleted_at?: any;
    name: string;
    title: string;
    icon: string;
    menu_type: number;
    url: string;
    redirect: string;
    component: string;
    is_active: number;
    hidden: number;
    hidden_in_tab: number;
    fixed: number;
    remark: string;
    meta: string;
    parent_id: string;
    tenant_menus?: any;
    children?: MenuItem[];
    permissions?: any[]; // 根据实际权限数据结构进行定义
}
