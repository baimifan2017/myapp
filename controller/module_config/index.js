/**
 * @author lzh
 * @desc: 配置模块
 * @date:2021-04-20
 */
const express = require("express");
const router = express.Router()

const userRouter = require('./user.router')

// 用户信息
router.use('/user', userRouter)


module.exports = router;
