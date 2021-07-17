/**
 * @author lzh
 * @desc: router层
 * @date:2021-04-16
 */
const express = require('express');
const router = express.Router();
const User = require('../../models/config/User')
const UserService = require('../../service/module_config/UserService')
const {resWithSuccess,resWithFail} = require('../../comm/response')


const userService = new UserService(router, User);

// 登录
router.post('/login', (async (req, res) => {
    const {userName, password} = req.body;
    const user = await userService.login(userName, password, req.session)
    if (user) {
        resWithSuccess.data = user;
        res.json(resWithSuccess)
    }else {
        resWithFail.msg = '请检查用户名及密码！'
        res.json(resWithFail)
    }
}))

// 注册
router.post('/register', userService.register)

// 退出登录
router.get('/loginOut', (async (req, res) => {
    // 清理全部session
    // req.session.cookie.maxAge = 0;
    req.session.userName = null;
    req.session.userId = null
    res.send({
        msg: '退出成功！'
    })
}))

userService.findByPage();
userService.save();
userService.delById();

module.exports = router
