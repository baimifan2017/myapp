/**
 * @description: 采购申请
 */
const express = require('express');
const router = express.Router();
const PurchaseApply = require('../../models/purchase/PurchaseHeader')
const BaseController = require('../module_comm/BaseController')
const Jwt = require('../../service/module_comm/Jwt');

// 权限验证中间件
router.use(Jwt.verifyToken)


const purchaseApplyController = new BaseController(router, PurchaseApply)

router.post('/findHeaderByPage', (async (req, res, next) => {
    let {body} = req;
    body.fields = ['name', 'code', 'tel', 'address', 'socialCreditCode']
    const searchParams = purchaseApplyController.buildSearchParam();
    try {
        const instance = await PurchaseApply.findAll(searchParams);
        res.json(Response.resResponse(instance));
    }catch (error){
        next(error)
    }
}))

purchaseApplyController.findByPage();
purchaseApplyController.save();
purchaseApplyController.delById();
purchaseApplyController.findTree();

module.exports = router;