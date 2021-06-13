/**
 *@author:lzh
 *@describe: 数据库初始化
 *@time:
 */

const {Sequelize} = require('sequelize');
const mongoose = require('mongoose');


const sequelize = new Sequelize('express-test', 'root', 'root', {
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



// mongodb
const url = 'mongodb://127.0.0.1:27017/express';
options = {
    useNewUrlParser: true,
    poolSize: 5, // 连接池中维护的连接数
    reconnectTries: Number.MAX_VALUE,
    keepAlive: 120,
};
// mongo 数据库连接配置
const mongoClient = mongoose.createConnection(url, options);

//监听数据库连接状态
mongoClient.once('open', () => {
    console.log('mongo数据库连接成功……')
})
mongoClient.once('close', () => {
    console.log('mongo数据库断开……')
});


module.exports = {sequelize, Sequelize,mongoClient};
