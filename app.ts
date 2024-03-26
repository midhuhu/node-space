/*
 * @FilePath        : /node-space/app.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    : 入口资源加载
 * @Date            : 2024-03-25 17:36:38
 * @LastEditTime    : 2024-03-26 10:11:29
 * @Copyright (c) 2024 by zhijiasoft.
 */
import createError from "http-errors";
import express from "express";
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {  LoginRouter, UsersRouter } from './routes/index';


const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 注入cors模块解决跨域
app.use(cors());

app.use(logger('dev'));

// 解析json数据格式
app.use(express.json());
// 使用 urlencoded 有效负载解析传入的请求
app.use(express.urlencoded({ extended: false }));

// 用于cookie签名和签名解析的中间件
app.use(cookieParser());

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// router
app.use(LoginRouter);
app.use(UsersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
} as express.ErrorRequestHandler);



export default app;
