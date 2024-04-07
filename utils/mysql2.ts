/*
 * @FilePath        : /node-space/utils/mysql2.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : mysql2 数据库函数封装
 * @Date            : 2024-04-03 09:21:02
 * @LastEditTime    : 2024-04-07 09:38:10
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

    /**
     * 查询操作，支持分页
     * @param tableName 表名
     * @param fields 查询字段
     * @param condition where 条件
     * @param params 查询参数
     * @param filters 多条件筛选
     * @param page 当前页
     * @param pageSize 每页条数
     * @returns
     */
    async query(
        tableName: string,
        fields: string[],
        condition: string = '',
        params?: any[],
        filters?: Record<string, any>,
        page?: number,
        pageSize?: number,
    ): Promise<any> {
        const fieldList = fields.length > 0 ? fields.join(',') : '*';
        let sql = `SELECT ${fieldList} FROM ${tableName}`;
        let sql_count = `SELECT COUNT(*) as total FROM ${tableName}`;
        let whereConditions: string[] = [];
        let queryParams: any[] = params ? [...params] : [];
        let countParams: any[] = params ? [...params] : [];

        // 处理直接提供的SQL条件
        if (condition) {
            whereConditions.push(condition);
        }

        // 处理filters中的筛选条件
        if (filters) {
            for (const [key, value] of Object.entries(filters)) {
                if (value !== undefined && value !== null && value !== '') {
                    whereConditions.push(`${key} = ?`);
                    queryParams.push(value);
                    countParams.push(value);
                }
            }
            console.log(222, whereConditions);
        }

        // 拼接WHERE子句
        if (whereConditions.length > 0) {
            sql += ' WHERE ' + whereConditions.join(' AND ');
            sql_count += ' WHERE ' + whereConditions.join(' AND ');
        }

        // 分页逻辑
        if (page !== undefined && pageSize !== undefined) {
            const offset = String((page - 1) * pageSize);
            sql += ` LIMIT ?, ?`;
            queryParams.push(offset, String(pageSize));
        }

        const [results] = await this.pool.execute(sql, queryParams);

        if (page !== undefined && pageSize !== undefined) {
            const [total] = (await this.pool.execute(sql_count, countParams)) as any;
            return { data: results, total: total[0]?.total };
        } else {
            return results;
        }
    }

    /**
     * 数据插入
     * @param tableName 表名
     * @param data 键值对数据 { name: 'John', age: 30 }
     * @returns
     */
    async insert(tableName: string, data: Record<string, any>): Promise<any> {
        const keys = Object.keys(data);
        const values = Object.values(data);
        const placeholders = keys.map(() => '?').join(',');
        const sql = `INSERT INTO ${tableName} (${keys.join(',')}) VALUES (${placeholders})`;
        const [result] = await this.pool.execute(sql, values);
        return result;
    }

    /**
     * 更新操作
     * @param tableName 表名
     * @param data 需要修改的键值对数据 { name: 'John', age: 30 }
     * @param condition 判断条件
     * @param params 判断条件传参
     * @returns
     */
    async update(
        tableName: string,
        data: Record<string, any>,
        condition: string,
        params: any[],
    ): Promise<any> {
        const entries = Object.entries(data);
        const updates = entries.map(([key, value]) => `${key} = ?`).join(', ');
        const sql = `UPDATE ${tableName} SET ${updates} WHERE ${condition}`;
        const values = [...Object.values(data), ...params];
        const [result] = await this.pool.execute(sql, values);
        return result;
    }

    /**
     * 删除操作
     * @param tableName 表名
     * @param condition 判断条件
     * @param params 判断条件传参
     * @returns
     */
    async delete(tableName: string, condition: string, params: any[]): Promise<any> {
        const sql = `DELETE FROM ${tableName} WHERE ${condition}`;
        const [result] = await this.pool.execute(sql, params);
        return result;
    }

    /**
     * 批量插入
     * @param tableName 表名
     * @param data
     * @param fields
     * @returns
     */
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
