/**
 * @author lzh
 * @desc:
 * @date:2021-04-20
 */
const session = require('express-session')
const MySQLStore = require('connect-mysql')(session)
const mysql = require('mysql2')

const session_options = {
    pool: mysql.createPool({
        user: 'root',
        password: '00000000',
        database: 'express-test'
    })
};




module.exports = {session_options}
