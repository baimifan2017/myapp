
const express = require('express');
const router = express.Router();
const Organization = require('../../models/config/Organization')
const OrganizationService = require('../../service/module_config/OrganizationService')
const Jwt = require('../../service/module_comm/Jwt');

// 权限验证中间件
router.use(Jwt.verifyToken)


const orgService = new OrganizationService(router, Organization)

orgService.findByPage();
orgService.save();
orgService.delById();
orgService.findTree();

module.exports = router;