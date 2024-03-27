/*
 * @FilePath        : /node-space/config.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 配置项
 * @Date            : 2024-03-25 15:19:37
 * @LastEditTime    : 2024-03-27 13:22:55
 * @Copyright (c) 2024 by zhijiasoft.
 */
const config = {
    // 数据库配置
    mysql: {
        host: 'localhost',
        user: 'root',
        password: 'root123456',
        database: 'saas_basic',
        port: 3306,
        dateStrings: true, // 强制时间格式
        multipleStatements: true, // 允许多条sql语句
    },
    secret: 'admin',
};

export default config;
