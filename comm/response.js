/**
 * @author lzh
 * @desc:
 * @date:2021-04-19
 */

// 请求成功
const resWithSuccess = {
    success: true,
    msg: '成功',
    data: null
}

// 请求失败
const resWithFail = {
    success: false,
    msg: '失败',
    data: null
}


class Response {
    constructor(props) {
        const {success, msg, data} = props;
        this.success = success || true;
        this.msg = msg || '成功';
        this.data = data || null;
    }

    static resWithSuccess = (msg, data) => {
        return {
            success: true,
            msg: msg || '成功',
            data: data || null
        }
    }

    static resWithFail = (msg, data) => {
        return {
            success: false,
            msg: msg || '失败',
            data: data || null
        }
    }
}

module.exports = {resWithSuccess, resWithFail,Response}
