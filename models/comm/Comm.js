const {DataTypes} = require("sequelize");
module.exports = {
    // 备注
    remark: {
        type: DataTypes.STRING(500)
    },
    // 是否冻结
    frozen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    // 租户代码
    tenement: {
        type: DataTypes.STRING(20)
    },
    // 创建人
    createdBy:{
        type: DataTypes.STRING(50)
    },
    // 更新人
    updatedBy:{
        type: DataTypes.STRING(50)
    }
}