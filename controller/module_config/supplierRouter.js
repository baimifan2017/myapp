/**
 * @description 供应商
 */
const express = require('express');
const router = express.Router();
const Supplier = require('../../models/config/Supplier')
const BaseController = require('../module_comm/BaseController')
const Jwt = require('../../service/module_comm/Jwt');
const {Response} = require('../../comm/response')

// 权限验证中间件
router.use(Jwt.verifyToken)


const supplerController = new BaseController(router, Supplier)

router.post('/findHeaderByPage', (async (req, res, next) => {
    let {body, body: {current, pageSize}} = req;
    body.fields = ['name', 'code', 'tel', 'address', 'socialCreditCode']
    const searchParams = supplerController.buildSearchParam(body);
    try {
        const instance = await Supplier.findAndCountAll(searchParams);
        res.json(Response.pagingRes(current, pageSize, instance));
    } catch (error) {
        next(error)
    }
}))

supplerController.save();
supplerController.findOneById();
supplerController.delById();

module.exports = router;