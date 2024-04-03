/*
 * @FilePath        : /node-space/utils/mysql2.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : mysql2 数据库函数封装
 * @Date            : 2024-04-03 09:21:02
 * @LastEditTime    : 2024-04-03 10:17:53
 * @Copyright (c) 2024 by zhijiasoft.
 */

import { createPool, Pool } from 'mysql2/promise';

// 数据库配置
interface DBConfig {
    host: string;
    user: string;
    password: string;
    database: string;
}

// 数据库连接池
class Database {
    private static instance: Database;
    private pool: Pool;

    private constructor(config: DBConfig) {
        this.pool = createPool(config);
    }

    public static getInstance(config: DBConfig): Database {
        if (!Database.instance) {
            Database.instance = new Database(config);
        }
        return Database.instance;
    }

    public getPool(): Pool {
        return this.pool;
    }
}

// 数据库操作封装
class DBService {
    private static instance: DBService;
    private pool: Pool;

    private constructor(pool: Pool) {
        this.pool = pool;
    }

    public static getInstance(pool: Pool): DBService {
        if (!DBService.instance) {
            DBService.instance = new DBService(pool);
        }
        return DBService.instance;
    }

    // 查询操作，支持分页
    async query(
        tableName: string,
        fields: string[],
        condition: string = '',
        params: any[] = [],
        page?: number,
        pageSize?: number,
    ): Promise<any> {
        const fieldList = fields.length > 0 ? fields.join(',') : '*';
        let sql = `SELECT ${fieldList} FROM ${tableName}`;
        if (condition) {
            sql += ` WHERE ${condition}`;
        }
        if (page !== undefined && pageSize !== undefined) {
            const offset = (page - 1) * pageSize;
            sql += ` LIMIT ?, ?`;
            params.push(offset, pageSize);
        }

        const [results] = await this.pool.execute(sql, params);
        return results;
    }

    // 插入操作
    async insert(tableName: string, data: any): Promise<any> {
        const keys = Object.keys(data);
        const values = Object.values(data);
        const placeholders = keys.map(() => '?').join(',');
        const sql = `INSERT INTO ${tableName} (${keys.join(',')}) VALUES (${placeholders})`;
        const [result] = await this.pool.execute(sql, values);
        return result;
    }

    // 更新操作
    async update(tableName: string, data: any, condition: string, params: any[]): Promise<any> {
        const entries = Object.entries(data);
        const updates = entries.map(([key, value]) => `${key} = ?`).join(', ');
        const sql = `UPDATE ${tableName} SET ${updates} WHERE ${condition}`;
        const values = [...Object.values(data), ...params];
        const [result] = await this.pool.execute(sql, values);
        return result;
    }

    // 删除操作
    async delete(tableName: string, condition: string, params: any[]): Promise<any> {
        const sql = `DELETE FROM ${tableName} WHERE ${condition}`;
        const [result] = await this.pool.execute(sql, params);
        return result;
    }

    // 批量插入
    async batchInsert(tableName: string, data: any[], fields: string[]): Promise<any> {
        const values = data.map((item) => fields.map(() => '?').join(','));
        const placeholders = values.join('), (');
        const sql = `INSERT INTO ${tableName} (${fields.join(',')}) VALUES (${placeholders})`;
        const params = data.flatMap((item) => Object.values(item));
        const [result] = await this.pool.execute(sql, params);
        return result;
    }

    // 批量插入大量数据
    async batchInsertChunked(
        tableName: string,
        data: any[],
        fields: string[],
        chunkSize = 1000,
    ): Promise<any> {
        const chunks = [];
        for (let i = 0; i < data.length; i += chunkSize) {
            chunks.push(data.slice(i, i + chunkSize));
        }

        const promises = chunks.map((chunk) => this.batchInsert(tableName, chunk, fields));
        return Promise.all(promises);
    }
}

export { Database, DBService };
