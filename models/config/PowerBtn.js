/**
 * @author lzh
 * @desc: 功能权限按钮
 * @date:2021-04-19
 */

const {sequelize} = require('../../db/init');
const {DataTypes} = require('sequelize');
const comm = require('../comm/Comm')

const PowerBtn = sequelize.define('PowerBtn', {
    // 权限名称
    powerName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    // 权限代码
    powerCode: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    // 所属页面权限
    belongTo: {
      type:DataTypes.STRING(50)
    },
    ...comm
}, {
    timestamps: true,
    tableName: 'tb_power_btn'
});

// 如果不存在，则创建当前表。
// (async () => {
//     await PowerBtn.sync({force:true})
// })()

module.exports = PowerBtn;