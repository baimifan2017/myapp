/**
 * @author lzh
 * @desc: 用户model
 * @date:2021-04-18
 */
const {sequelize} = require('../../db/init')
const {DataTypes} = require('sequelize');
const File = require('./File');
const {hash} = require("../../utils");


const User = sequelize.define('user', {
    // 在这里定义模型属性
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            len: [2, 50]
        },
        unique: 'uk_user_unique',
    },
    code:{
      type:DataTypes.STRING(50)
    },
    sex: {
        type: DataTypes.ENUM,
        values: ['male', 'female']
        // allowNull 默认为 true
    },
    email: {
        type: DataTypes.STRING(50),
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: DataTypes.STRING(20),
        unique: 'uk_user_unique',
    },
    // 年龄
    age: {
        type: DataTypes.INTEGER,
    },
    // 地址
    address: {
        type: DataTypes.STRING(100)
    },
    attachIds: {
        type: DataTypes.STRING(50),
    },
    password: {
        type: DataTypes.STRING(200),
        set(value) {
            this.setDataValue('password', hash(value))
        }
    },
    deptId: {
        type: DataTypes.STRING(50)
    },
    // 工种
    typeOfWorkId: {
        type: DataTypes.STRING(50)
    },
    description: {
        type: DataTypes.STRING(200)
    },
    // 身份证号
    idNumber: {
        type: DataTypes.STRING(20),
        notNull: true
    },
    // 银行卡号
    bankAccountNumber: {
        type: DataTypes.INTEGER,
        notNull: true
    },
    // 银行户名称
    bankAccountName: {
        type: DataTypes.STRING(50),
        notNull: true
    },
    // 租户代码
    tenement: {
        type: DataTypes.STRING(20)
    }
}, {
    timestamps: true,
    //参数停止 Sequelize 执行自动复数化
    freezeTableName: true,
    //表名称
    tableName: 'tb_user',
});

//模型实例
// (async () => {
//     await User.sync({force:true});
// })();


module.exports = User;

