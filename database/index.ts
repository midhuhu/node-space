// 导入mysql模块
import mysql from "mysql";
import config from "../config";

// 创建数据库连接对象
const db = mysql.createPool(config.mysql);

// 向外共享db数据库连接对象
export default db;
