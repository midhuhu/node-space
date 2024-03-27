/*
 * @FilePath        : /node-space/app.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 入口资源加载
 * @Date            : 2024-03-25 17:36:38
 * @LastEditTime    : 2024-03-27 15:43:33
 * @Copyright (c) 2024 by zhijiasoft.
 */
import createError from 'http-errors';
import express from 'express';
import cors from 'cors';
import path from 'path';
import http from 'http';
import debug from 'debug';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { LoginRouter, UsersRouter, MenusRouter } from './routes/index';
import session from 'express-session';

const app = express();

/**
 * set port
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * view engine setup
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/**
 * 注入cors模块解决跨域
 */
app.use(cors());

app.use(logger('dev'));

/**
 * 解析json数据格式
 * 使用 urlencoded 有效负载解析传入的请求
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * 用于cookie签名和签名解析的中间件
 */
app.use(cookieParser('admin'));
app.use(
    session({
        secret: 'admin', // 对cookie进行签名
        resave: false, // 强制将会话保存回会话容器
        saveUninitialized: true,
        cookie: {
            maxAge: 100000,
        },
    }),
);

/**
 * 设置静态文件目录
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
 * router
 */
app.use(LoginRouter);
app.use(UsersRouter);
app.use(MenusRouter);

/**
 * catch 404 and forward to error handler
 */
app.use(function (req, res, next) {
    next(createError(404));
});

/**
 * error handler
 */
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
} as express.ErrorRequestHandler);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`服务器正在监听端口: http://localhost:${port}`);
});
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: any) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: any) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
    debug('Listening on ' + bind);
}

export default app;
