/**
 * @author lzh
 * @desc: 配置模块
 * @date:2021-04-20
 */
const express = require("express");
const router = express.Router()
const userRouter = require('./userRouter')
const orgRouter = require('./orgRouter')

// 用户信息
router.use('/user', userRouter)

// 部门信息
router.use('/org', orgRouter)


module.exports = router;
