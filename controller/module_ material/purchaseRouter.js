/**
 * @description: 采购申请
 */
const express = require('express');
const router = express.Router();
const PurchaseHeader= require('../../models/purchase/PurchaseHeader')
const PurchaseService= require('../../service/module_purchase/PurchaseService')
const BaseController = require('../module_comm/BaseController')
const Jwt = require('../../service/module_comm/Jwt');

// 权限验证中间件
router.use(Jwt.verifyToken)


const purchaseHeaderController = new BaseController(router, PurchaseHeader);
const purchaseService  = new PurchaseService();

router.post('/save', purchaseService.saveApply)


router.post('/findItems', purchaseService.findItems)



purchaseHeaderController.findByPage();
purchaseHeaderController.findOneById({
    includeAlias:'purchaseItems'
});
purchaseHeaderController.delById();
purchaseHeaderController.findTree();

module.exports = router;