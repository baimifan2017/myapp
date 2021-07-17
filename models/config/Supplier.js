/**
 * @description: 供应商维护表
 */

const {sequelize} = require('../../db/init');
const {DataTypes} = require('sequelize');
const comm = require('../comm/Comm');

const Supplier = sequelize.define('Supplier', {
    // 供应商名称
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    // 供应商代码
    code: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    // 联系电话
    tel: {
        type: DataTypes.STRING(50),
    },
    // 地址
    address: {
        type: DataTypes.STRING(200)
    },
    // 社会信用代码
    socialCreditCode: {
        type: DataTypes.STRING(50)
    },
    // 联系人
    linkName: {
        type: DataTypes.STRING(20)
    },
    email: {
        type: DataTypes.STRING(20),
        validator: {
            isEmail: true
        }
    },
    // 银行卡号
    bankAccountNumber: {
        type: DataTypes.INTEGER,
    },
    // 银行户名称
    bankAccountName: {
        type: DataTypes.STRING(50),
    },
    ...comm
}, {
    timestamps: true,
    paranoid: true, // 软删除
    comment: '供应商',
    tableName: 'tb_supplier',
}, {
    indexes: [{
        fields: ['socialCreditCode', 'name', 'linkName']
    }]
});

// 如果不存在，则创建当前表。
// (async () => {
//     await Supplier.sync({force: true})
// })()

module.exports = Supplier;