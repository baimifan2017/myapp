const { createHash } = require('crypto');

/**
 * 采用hash加密
 * @param v 加密对象
 * @returns {*}
 */
const hash = (v) =>{
    const myHash = createHash('sha256');
    myHash.update(v);
    // 十六进制输出
    return myHash.digest('hex');
}

module.exports = {
    hash
}
