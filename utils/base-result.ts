/*
 * @FilePath        : /node-space/utils/base-result.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 统一返回结果
 * @Date            : 2024-03-26 10:03:51
 * @LastEditTime    : 2024-03-26 17:12:17
 * @Copyright (c) 2024 by zhijiasoft.
 */

import BaseResultCode from './base-result-code';

/**
 * @author zlq
 * @description 统一返回结果
 */
class BaseResult {
    /**
     * 返回code
     */
    code;
    /**
     * 返回消息
     */
    msg;
    /**
     * 返回数据
     */
    data;
    /**
     * 返回时间
     */
    time;

    /**
     *
     * @param code {number} 返回code
     * @param msg {string} 返回消息
     * @param data {any} 返回具体对象
     */
    constructor(code: number, msg: string, data: any) {
        this.code = code;
        this.msg = msg;
        this.data = data;
        this.time = Date.now();
    }

    /**
     * 成功
     * @param data {any} 返回对象
     * @return {BaseResult}
     */
    static success(data: any): BaseResult {
        return new BaseResult(BaseResultCode.SUCCESS.code, BaseResultCode.SUCCESS.desc, data);
    }

    /**
     * 失败
     */
    static fail(errData: any) {
        return new BaseResult(
            BaseResultCode.FAILED.code,
            BaseResultCode.FAILED.desc + ':' + errData,
            errData,
        );
    }

    /**
     * 参数校验失败
     */
    static validateFailed(param: any) {
        return new BaseResult(
            BaseResultCode.VALIDATE_FAILED.code,
            BaseResultCode.VALIDATE_FAILED.desc,
            param,
        );
    }

    /**
     * 拦截到的业务异常
     * @param bizException {BizException} 业务异常
     */
    static bizFail(bizException: any) {
        return new BaseResult(bizException.code, bizException.msg, null);
    }
}

export default BaseResult;
