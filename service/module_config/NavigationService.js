/**
 * @author lzh
 * @desc: 服务层
 * @date:2021-04-16
 */

const {sequelize, Sequelize} = require('../../db/init')
const {dLogin} = require('../../dao/dao_config/user')
const Navigation = require('../../models/config/Navigation')
const PowerBtn = require('../../models/config/PowerBtn')
const BaseService = require('../../controller/module_comm/BaseController')

const {resWithSuccess, resWithFail} = require('../../comm/response')


const Op = Sequelize.Op;

class UserService extends BaseService {
    constructor(router, model) {
        super(router, model);
    }

    /**
     * 查询
     * @return {Promise<void>}
     * @param req
     * @param res
     */
    findByPage = async (req, res,next) => {
        try {
            // 注意get方法参数在query中
            const {body} = req;
            if (body.id) {
                const searchParam = this.buildSearchParam(body)
                const { dataValues } = await Navigation.findAll({
                    ...searchParam,
                    raw: true,
                    // 将关联转为对象
                    nest: true,
                    include: PowerBtn
                })

                resWithSuccess.data = dataValues
                res.json(resWithSuccess);
            }
        } catch (error) {
            // 如果发生异常，回滚事务。
            next(error)
        }
    }
}


module.exports = UserService;
