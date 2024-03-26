/*
 * @FilePath        : /node-space/utils/base-result-code.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 业务异常通用code
 * @Date            : 2024-03-26 09:17:11
 * @LastEditTime    : 2024-03-26 10:12:07
 * @Copyright (c) 2024 by zhijiasoft.
 */

class BaseResultCode {
    /**
     * code
     */
    code;
    /**
     * 说明
     */
    desc;

    constructor(code: number, desc: string) {
        this.code = code;
        this.desc = desc;
    }

    static SUCCESS = new BaseResultCode(200, '成功');
    static FAILED = new BaseResultCode(500, '失败');
    static VALIDATE_FAILED = new BaseResultCode(400, '参数校验失败');
    static API_NOT_FOUNT = new BaseResultCode(404, '接口不存在');
    static API_BUSY = new BaseResultCode(700, '操作过于频繁')
    
}

export default BaseResultCode
