
const express = require('express');
const router = express.Router();
const Organization = require('../../models/config/Organization')
const OrganizationService = require('../../service/module_config/OrganizationService')
const Jwt = require('../../service/module_comm/Jwt');


const orgService = new OrganizationService(router, Organization)

// 权限验证中间件
router.use(Jwt.verifyToken)

router.post('/save',async (req,res) => {
    const { body } = req;
    // 查找并更新数据

})


orgService.findByPage();
orgService.save();
orgService.delById();

module.exports = router;