/**
 * @author lzh
 * @desc: 配置模块
 * @date:2021-04-20
 */
const express = require("express");
const router = express.Router();
const file = require('./file')

// mongo
router.use('/files', file)


module.exports = router;
