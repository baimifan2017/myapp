const jwt = require('jsonwebtoken');
const {resWithSuccess,resWithFail} = require('../../comm/response')

class Jwt {
    /**
     * 生成token
     * @param info token 信息
     * @param time 有效时间
     * @returns {number}
     */
    static generateToken = (info = {foo:'bar'},time = '1d') => {
        return jwt.sign({
            ...info
        },'haha',{
            expiresIn:time
        })
    }

    /**
     * 验证token
     * @param req
     * @param res
     * @param next
     */
    static verifyToken = (req,res,next) => {
        if(req.headers.hasOwnProperty('token')){
            const {token} = req.headers;
            jwt.verify(token,'haha',(error,decoded) => {
                if(error){
                    resWithFail.msg = 'token过期或不存在'
                    res.status(401).json(resWithFail);
                }else {
                    next()
                }
            })
        }else {
            resWithFail.msg = 'token过期或不存在'
            res.status(401).json(resWithFail)
        }
    }
}

module.exports = Jwt;
