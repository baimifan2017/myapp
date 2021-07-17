/**
 * @author lzh
 * @desc: 采购申请
 * @date:2021-04-18
 */
const {sequelize} = require('../../db/init')
const {DataTypes} = require('sequelize');
const comm = require('../comm/Comm');

const PurchaseHeader = sequelize.define('purchaseApply', {
    // 申请单号
    applyId: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: 'uk_apply_id'
    },
    applyNo:{
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: 'uk_apply_no'
    },
    // 申请人
    applicantId: {
        type: DataTypes.STRING(50),
    },
    // 申请人
    applicantName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },

    orgId: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },

    orgName: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    // 总价
    totalAmount: {
        type: DataTypes.DOUBLE,
    },
    // 计划使用日期
    planUseDate: {
        type: DataTypes.DATE
    },
    // 流程状态
    status: {
        type: DataTypes.ENUM,
        values: ['init', 'process', 'completed','refused'],
        defaultValue: 'init'
    },
    // 审批回复
    approveRes:{
        type: DataTypes.STRING(200),
    },
    ...comm
}, {
    timestamps: true,
    version:true, // 乐观锁
    comment: '物料采购',
    freezeTableName: true,
    //表名称
    tableName: 'tb_purchase_apply',
    modelName: 'User'
});

//模型实例
(async () => {
    await PurchaseHeader.sync({force: true});
})();


module.exports = PurchaseHeader;

