/**
 * @author lzh
 * @desc: 表单生成，使用详情参考https://v2.formilyjs.org/zh-CN
 * @date:2021-05-02
 */


/**
 * @author lzh
 * @desc:
 * @date:2021-05-02
 */
const { sequelize } = require('../../db/init')
const { Database } = require('sequelize')


const ModelDesign = sequelize.define('ModelDesign',{
    modelName: {
        type:Database.STRING(50),
        allowNull:false
    },
    modelCode:{
        type:Database.STRING(50),
        unique:true
    },
    frozen:{
        type:Database.BOOL(false),
    },
})
