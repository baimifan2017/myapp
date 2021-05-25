/**
 * @author lzh
 * @desc: 服务层
 * @date:2021-04-16
 */
const {QueryTypes} = require('sequelize');
const {sequelize} = require ('../../../db/init');


// 用户登录
const dLogin = async (params) => {
    return await sequelize.query(
        "select * from tb_user where userName = $1 and passWord =$2",
        {
            bind: params,
            type: QueryTypes.SELECT
        })
}


module.exports = {dLogin}
