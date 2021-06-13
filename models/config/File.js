const {sequelize} = require('../../db/init');
const {DataTypes} = require('sequelize');

const File = sequelize.define('File', {
    // 文件名称
    originalName: {
        type: DataTypes.STRING(100),
    },
    path: {
        type: DataTypes.STRING(50)
    },
    // 文件大小
    size: {
        type: DataTypes.INTEGER
    },
    // 相对路径
    destination: {
        type: DataTypes.STRING(200)
    },
    // 文件类型
    mimetype: {
        type: DataTypes.STRING(50)
    },
    // 文件类型
    fileType: {
        type: DataTypes.STRING(50)
    },
    // 是否已经被使用
    isLinked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    // 增加新建、更新时间戳
    timestamps: true,
    tableName: 'tb_file',
    modelName: 'File'
});
//模型实例
// (async () => {
//     await sequelize.sync({ force: true });
// })();

module.exports = File;

