/**
 * @author lzh
 * @desc: 服务层
 * @date:2021-04-16
 */
const {QueryTypes} = require('sequelize');
const {sequelize} = require('../../../db/init');


// 用户登录
const dLogin = (userName, passWord) => {
    return sequelize.query(
        "select * from tb_user where userName = $1 and passWord = $2",
        {
            bind: [userName, passWord],
            type: QueryTypes.SELECT
        })
}


// 查询并更新附近状态
const updateFileIsLinked = (attachIds) => {
    return sequelize.query(
        'update tb_file set isLinked = true where id in($1)',
        {
            bind: [attachIds],
            type: QueryTypes.UPDATE
        }
    )
}


module.exports = {dLogin,updateFileIsLinked}
