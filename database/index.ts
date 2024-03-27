/*
 * @FilePath        : /node-space/database/index.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : mysql封装
 * @Date            : 2024-03-25 15:18:46
 * @LastEditTime    : 2024-03-27 11:00:38
 * @Copyright (c) 2024 by zhijiasoft.
 */
// 导入mysql模块
import mysql from 'mysql';
import config from '../config';

// 创建数据库连接对象
const db = mysql.createPool(config.mysql);

//封装sql执行函数
const executeQuery = (sql: any, values: any) => {
    return new Promise((resolve, reject) => {
        db.getConnection(
            (
                err: any,
                connection: {
                    query: (
                        arg0: any,
                        arg1: any,
                        arg2: (queryErr: any, results: any) => void,
                    ) => void;
                    release: () => void;
                },
            ) => {
                if (err) {
                    reject(err);
                    return;
                }

                connection.query(sql, values, (queryErr: any, results: unknown) => {
                    connection.release();

                    if (queryErr) {
                        reject(queryErr);
                    } else {
                        resolve(results);
                    }
                });
            },
        );
    });
};

// 向外共享db数据库连接对象
export { db, executeQuery };
