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
        allowNull: false
    },
    // 组织机构代码
    orgCode: {
        type: DataTypes.STRING(50),
        allowNull: false
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
    // 备注
    remark: {
        type: DataTypes.STRING(500)
    },
    // 是否冻结
    frozen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    tenement: {
        type: DataTypes.STRING(20)
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