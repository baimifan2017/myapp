
const express = require('express');
const router = express.Router();
const Organization = require('../../models/config/Organization')
const BaseController = require('../module_comm/BaseController')
const Jwt = require('../../service/module_comm/Jwt');

// 权限验证中间件
router.use(Jwt.verifyToken)


const orgController = new BaseController(router, Organization)

orgController.findByPage();
orgController.save();
orgController.delById();
orgController.findTree();

module.exports = router;