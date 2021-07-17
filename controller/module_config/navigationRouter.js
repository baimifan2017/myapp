const express = require('express');
const router = express.Router();
const BaseController = require('../module_comm/BaseController')
const Navigation = require('../../models/config/Navigation')
const PowerBtn = require('../../models/config/PowerBtn')
const Jwt = require('../../service/module_comm/Jwt');
const {sequelize} = require('../../db/init')
const {omit, get} = require('lodash');
const {resWithSuccess, Response} = require('../../comm/response')

// 权限验证中间件
router.use(Jwt.verifyToken)

const navigationController = new BaseController(router, Navigation);

// 保存权限按钮
router.post('/savePowerBtn', (async (req, res, next) => {
    const {body: {myNavigationId, powerBtn}} = req;
    powerBtn.myNavigationId = myNavigationId;
    try {
        const instance = await PowerBtn.upsert(powerBtn, {
            where: {
                myNavigationId: myNavigationId
            },
        })
        resWithSuccess.data = instance;
        res.json(resWithSuccess)
    } catch (err) {
        next(err)
    }
}))

// 删除权限按钮
router.delete('/delPowerBtn', (async (req, res, next) => {
    const {body: {id}} = req;
    try {
        const instance = PowerBtn.destroy({
            where: {
                id: id
            }
        })
        resWithSuccess.data = instance;
        res.json(resWithSuccess);
    } catch (err) {
        next(err)
    }
}))

// 新增导航树
navigationController.save();
// 查询导航树
navigationController.findTree()
// 删除
navigationController.delById()
// 详情
navigationController.findOneById('powerBtn')


module.exports = router;