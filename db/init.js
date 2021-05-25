/**
 *@author:lzh
 *@describe: 数据库初始化
 *@time:
 */

const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('express-test', 'root', '00000000', {
    host: "127.0.0.1",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// sequelize.define('mysql::memory:',{
//     define: {
//         freezeTableName: true
//     }
// })

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })


module.exports = {sequelize, Sequelize};
