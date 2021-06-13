/**
 * @author lzh
 * @desc: 部门
 * @date:2021-04-19
 */

const {sequelize} = require('../../db/init');
const {DataTypes} = require('sequelize');

const Organization = sequelize.define('Organization', {
    // 组织机构名称
    orgName: {
        type: DataTypes.STRING(50),
    },
    // 组织机构代码
    orgCode: {
        type: DataTypes.STRING(50)
    },
    // 部门名称
    departName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    // 部门代码
    departCode: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    // 职位
    jobTitleName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    // 父级节点
    parentId: {
        type: DataTypes.STRING(50)
    },
    // 是否冻结
    frozen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true,
    tableName: 'tb_organization'
});

// 如果不存在，则创建当前表。
(async () => {
    await Organization.sync()
})()

module.exports = Organization;