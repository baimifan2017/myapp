/**
 * @author lzh
 * @desc: 配置模块
 * @date:2021-04-20
 */
const express = require("express");
const router = express.Router()
const userRouter = require('./userRouter')
const orgRouter = require('./orgRouter')
const supplierRouter = require('./supplierRouter')
const navigationRouter = require('./navigationRouter')

// 用户信息
router.use('/user', userRouter)

// 部门信息
router.use('/org', orgRouter)

// 供应商维护
router.use('/supplier', supplierRouter)

// 页面配置
router.use('/navigation',navigationRouter)


module.exports = router;
