/**
 * @author lzh
 * @desc: 服务层
 * @date:2021-04-16
 */
const {QueryTypes} = require('sequelize')
const {dLogin} = require('../../../dao/dao_config/user')
const userModel = require('../../../models/config/User')
const {resWithSuccess,resWithFail} = require('../../../comm/response')

class UserService {
    /**
     * 用户登录
     * @param userName
     * @param password
     * @param session
     */
    login = async (userName, password, session) => {
        const user = dLogin([userName, password])
        if (user) {
            session.userName = userName;
            session.userId = user.id;
            return user
        }
    }

    /**
     * 用户注册
     * @return {Promise<void>}
     * @param req
     * @param res
     */
    register = async (req, res) => {
        const {body} = req;
        const user = await userModel.findOne({
            where: {
                phone: body.phone
            }
        })
        if(user) {
            resWithFail.data = user;
            resWithFail.msg = '当前用户电话号码已经被注册，请检查！';
            res.json(resWithFail);
        }

        resWithSuccess.data = await userModel.create(body);
        res.json(resWithSuccess);
    }
}


module.exports = UserService;
