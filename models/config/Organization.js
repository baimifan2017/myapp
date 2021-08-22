/**
 * @author lzh
 * @desc: 部门
 * @date:2021-04-19
 */

const {sequelize} = require('../../db/init');
const {DataTypes} = require('sequelize');
const comm = require('../comm/Comm')

const Organization = sequelize.define('organization', {
    // 组织机构名称
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    // 组织机构代码
    code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    orgCodePath: {
        type: DataTypes.STRING(50)
    },
    orgNamePath: {
        type: DataTypes.STRING(50)
    },
    // 父级节点
    pid: {
        type: DataTypes.STRING(50)
    },

    ...comm
}, {
    timestamps: true,
    tableName: 'tb_organization'
});

// 如果不存在，则创建当前表。
// (async () => {
//     await Organization.sync({force:true})
// })()

module.exports = Organization;