/**
 * @author lzh
 * @desc:
 * @date:2021-04-19
 */

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {Op} = require("sequelize");

const {resWithSuccess,Response} = require('./response')

// false:表示使用系统模块querystring来处理，也是官方推荐的
router.use(bodyParser.urlencoded({extended: false}));

class CommWays {
    /**
     * 保存
     * @param router 路由
     * @param model 模型名称
     * @return {*}
     */
    static save(router, model) {
        return router.post('/save', (async (req, res) => {
            const {body} = req;
            if (!body?.id) {
                if (body.id === '' || body.id === null) {
                    delete body.id;
                }
                resWithSuccess.data = await model.create(req.body);
            } else {
                resWithSuccess.data = await model.update(body, {
                    where: {
                        id: {
                            [Op.EQUAL]: body.id
                        }
                    }
                })
            }
            res.json(resWithSuccess);
        }))
    }

    /**
     * 分页查询
     * @param router
     * @param model
     * @return {*}
     */
    static findByPage(router, model) {
        return router.post('/findByPage', (async (req, res) => {
            const {body} = req;
            if (!body) throw new Error('查询参数不能为空！');
            resWithSuccess.data = await model.findAll(body);
            res.json(resWithSuccess);
        }))
    }

    /**
     *
     * @param router
     * @param model
     */
    static delById(router, model) {
        return router.delete('/deleteById', (async (req, res) => {
            const {id} = req.body;
            const instance = await model.destroy({
                where: {
                    id: id
                }
            })
            if(!instance){
                res.json(Response.resWithFail('删除失败',instance))
            }
            res.json(Response.resWithSuccess('删除成功',instance))
        }))
    }

    /**
     * 构造树形数据
     * @param data array 类型
     * @return {[]}
     */
    static buildTree(data) {
        const res = [];
        // 找出所有根结点
        for (const item of data) {
            if (!item.pid) {
                item.children = getNode(item.id);
                res.push(item);
            }
        }

        // 传入根结点id 递归查找所有子节点
        function getNode(id) {
            const node = [];
            for (const item of data) {
                if (item.pid === id) {
                    item.children = getNode(item.id);
                    node.push(item);
                }
            }
            if (node.length === 0) return;
            return node;
        }

        return res;
    }


}


module.exports = CommWays;
