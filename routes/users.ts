/*
 * @FilePath        : /node-space/routes/users.ts
 * @Author          : zlq midhuhu@163.com
 * @Description:    :
 * @Date            : 2024-03-25 15:00:34
 * @LastEditTime    : 2024-04-03 13:53:04
 * @Copyright (c) 2024 by zhijiasoft.
 */
import express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/user', function (req, res, next) {
    console.log('req', req);

    res.send('respond with a resource');
});

export default router;
