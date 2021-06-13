/**
 * @author lzh
 * @desc:
 * @date:2021-05-02
 */
const { sequelize } = require('../../db/init')
const { DataTypes } = require('sequelize')


const ModelDesign = sequelize.define('ModelDesign',{
    modelName: {
        type:DataTypes.STRING(50),
        allowNull:false
    },
    modelCode:{
        type:DataTypes.STRING(50),
        unique:true
    },
    frozen:{
        type:DataTypes.BOOL(false),
    },
})
