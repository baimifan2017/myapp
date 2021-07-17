/**
 * @author lzh
 * @desc: 服务层
 * @date:2021-04-16
 */

const {sequelize, Sequelize} = require('../../db/init')
const {dLogin} = require('../../dao/dao_config/user')
const User = require('../../models/config/User')
const File = require('../../models/config/File')
const BaseService = require('../../controller/module_comm/BaseController')
const Jwt = require('../module_comm/Jwt')
const {resWithSuccess, resWithFail} = require('../../comm/response')


const Op = Sequelize.Op;

class UserService extends BaseService {
    constructor(router, model) {
        super(router, model);
    }


    /**
     * 新增采购申请
     * @return {Promise<void>}
     * @param req
     * @param res
     */
    save = async (req, res,next) => {
        // 开始一个事务并保存到变量中
        const tran = await sequelize.transaction();
        const {body} = req;
        const user = await User.findOne({
            where: {
                phone: body.phone
            }
        })
        if (user) {
            resWithFail.data = user;
            resWithFail.msg = '当前用户电话号码已经被注册，请检查！';
            res.json(resWithFail);
        }
        try {
            const {attachIds} = body;
            if (attachIds) {
                await File.update({isLinked: true}, {
                    where: {
                        id: {
                            [Op.in]: attachIds
                        }
                    }
                })
                body.attachIds = attachIds.toString();
            }
            const {dataValues} = await User.create(body, {transaction: tran});
            // 提交事务
            await tran.commit();

            resWithSuccess.data = dataValues
            res.json(resWithSuccess);
        } catch (error) {
            // 如果发生异常，回滚事务。
            await tran.rollback();
            next(error)
        }
    }
}


module.exports = UserService;