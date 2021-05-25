/**
 * @author lzh
 * @desc: 用户model
 * @date:2021-04-18
 */
const {sequelize} = require('../../db/init')
const {DataTypes} = require('sequelize');

const User = sequelize.define('User', {
    // 在这里定义模型属性
    userName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            len: [2, 50]
        },
        unique: 'uk_user_unique',
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
    // 地址
    address: {
        type: DataTypes.STRING(100)
    },
    photo: {
        type: DataTypes.BLOB,
    },
    password: {
        type: DataTypes.STRING(50)
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
    modelName: 'User'
});

// 模型实例
// (async () => {
//     await User.sync({ force: true });
// })();


module.exports = User;

