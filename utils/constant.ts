/**
 *@author:lzh
 *@describe:
 *@time:
 */


const mysql = require('mysql2');

// session存储
const session_options = {
    pool: mysql.createPool({
        user: 'root',
        password: '00000000',
        database: 'express-test'
    })
};

module.exports = {session_options};


