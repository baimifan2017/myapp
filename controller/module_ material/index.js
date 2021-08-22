/**
 * @author lzh
 * @desc: 物料管理
 * @date:2021-04-20
 */
const express = require("express");
const router = express.Router()
const purchaseRouter = require('./purchaseRouter');


// 采购申请
router.use('/purchase', purchaseRouter)

module.exports = router;
