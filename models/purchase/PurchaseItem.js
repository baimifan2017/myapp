/**
 * @author lzh
 * @desc: 采购申请
 * @date:2021-04-18
 */
const {sequelize} = require('../../db/init')
const {DataTypes} = require('sequelize');
const comm = require('../comm/Comm');

const PurchaseItem = sequelize.define('purchaseItem', {
    // 申请单号
    planUseDate: {
        type: DataTypes.DATE
    },
    applyNo: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: 'uk_apply_no'
    },
    // 物料名称
    name: {
        type: DataTypes.STRING(50),
    },
    // 规格型号
    specification: {
        type: DataTypes.STRING(50),
    },
    // 数量
    amount: {
        type: DataTypes.INTEGER,
        notNull: true
    },
    // 单位
    unit: {
        type: DataTypes.STRING(20),
    },
    // 单价
    unitPrice: {
        type: DataTypes.DOUBLE,
    },
    // 总价
    totalAmount: {
        type: DataTypes.DOUBLE,
    },
    // 供应商
    supplierId: {
        type: DataTypes.STRING(200)
    },
    supplierName: {
        type: DataTypes.STRING(200)
    },
    // 计划使用日期
    planUseDate: {
        type: DataTypes.DATE
    },
    // 流程状态
    status: {
        type: DataTypes.ENUM,
        values: ['init', 'process', 'completed'],
        defaultValue: 'init'
    },
    ...comm
}, {
    timestamps: true,
    version: true, // 乐观锁
    comment: '物料采购',
    freezeTableName: true,
    //表名称
    tableName: 'tb_purchase_item',
    modelName: 'User'
});

//模型实例
// (async () => {
//     await sequelize.sync({force: true});
// })();


module.exports = PurchaseItem;

