const express = require('express')
const app = express()
const session = require('express-session')
const MySQLStore = require('connect-mysql')(session)
const bodyParser = require('body-parser');
const {session_options} = require('../utils/config')

// comm
const commRouter = require('./module_comm')

// config
const configRouter = require('./module_config')


// false:表示使用系统模块querystring来处理，也是官方推荐的
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

// session配置
app.use(session({
    secret: 'keyboard cat', // 服务器端生成签名
    name: 'x-sid', // cookie名称
    resave: true, // 强制存储session，即使session未发生变化
    saveUninitialized: true, // 强制将未初始化的session存储
    cookie: {
        secure: false, //true, 只有https协议才能访问session
        maxAge: 60 * 60 * 1000
    },
    rolling: true, // 如果session没有过期，重新访问时候将未session续期。
    store: new MySQLStore(session_options)
}))


app.use(configRouter);
// 通用路由
app.use(commRouter)
// 跨域设置
const allow_origin = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length,Authorization,Accept,X-Requested-With');
    // res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    // if (req.method === 'option') {
    //     res.send(200)
    // } else {
    //     next()
    // }

    next()
}
// 异常拦截器
const error_handler_middleware = (err, req, res, next) => {
    if (err) {
        const {message} = err
        res.status(500)
            .json({
                success: false,
                message: `${message}`
            })
    } else {
        next()
    }
}

// 日志
const logger_middleware = (req, res, next) => {
    const log = {
        method: req.method,
        params: req.params,
    }
    console.log('logger:' + JSON.stringify(log));
    next()
}

app.use((error, req, res, next) => {
    logger_middleware(req, res, next)
    error_handler_middleware(error, req, res, next);
    // allow_origin(req, res, next)
});

app.listen(5001, () => {
    console.log('server running.....')
})

module.exports = app;
