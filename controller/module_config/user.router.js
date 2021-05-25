/**
 * @author lzh
 * @desc: router层
 * @date:2021-04-16
 */
const express = require('express');
const router = express.Router();
const CommWays = require('../../comm/CommWays')
const User = require('../../models/config/User')
const UserService = require('../../service/module_config/user/user.service')
const {resWithSuccess} = require('../../comm/response')


const userService = new UserService();

// 登录
router.post('/login',  (async (req, res) => {
    const {userName, password} = req.body;
    const user = await userService.login(userName, password, req.session)
    if(user){
        console.log('user---',user)
        debugger
        resWithSuccess.data = user;
        res.json(resWithSuccess)
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

CommWays.findByPage(router, User);
CommWays.save(router, User);
CommWays.delById(router, User);

module.exports = router
