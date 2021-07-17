/**
 * @description: 页面导航配置
 *               包含页面基本信息配置，页面功能按钮权限。
 */

const {sequelize} = require('../../db/init');
const {DataTypes} = require('sequelize');
const comm = require('../comm/Comm');
const PowerBtn = require('./PowerBtn');


const Navigation = sequelize.define('Navigation', {
    // 导航名称
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    // 页面路径
    url: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    // icon
    icon: {
        type: DataTypes.STRING(50)
    },
    // 父级id
    pid: {
        type: DataTypes.STRING(50)
    },

    ...comm
}, {
    timestamps: true,
    tableName: 'tb_navigation'
})

/**
 * 一对多关系
 * CASCADE：父表delete、update的时候，子表会delete、update掉关联记录；
 * SET NULL：父表delete、update的时候，子表会将关联记录的外键字段所在列设为null，所以注意在设计子表时外键不能设为not null；
 * RESTRICT：如果想要删除父表的记录时，而在子表中有关联该父表的记录，则不允许删除父表中的记录；
 * NO ACTION：同 RESTRICT，也是首先先检查外键；
 */


// 采用hasxx, Navigation的id将会被存在PowerBtn中

/**
 * getPowerBtn: [Function],
 * countPowerBtn: [Function],
 * hasPowerBtn: [Function],
 * setPowerBtn: [Function],
 * addPowerBtn: [Function],
 * removePowerBtn: [Function],
 *  createPowerBtn: [Function]

 */
Navigation.hasMany(PowerBtn,
    {
        // onUpdate: 'cascade',
        // onDelete: 'cascade',
        as: 'powerBtn',
        foreignKey: {
            name: 'myNavigationId',
            allowNull: true
        }
    });

// 采用belongsTo, Navigation中的id将会被存在PowerBtn中
// PowerBtn.belongsTo(Navigation);


// 如果不存在，则创建当前表。
// (async () => {
//     await sequelize.sync({force: true})
// })()
//

module.exports = Navigation;