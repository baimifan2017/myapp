/**
 * @author lzh
 * @desc:
 * @date:2021-04-19
 */

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {Op} = require("sequelize");

const {resWithSuccess, Response} = require('../../comm/response')

// false:表示使用系统模块querystring来处理，也是官方推荐的
// router.use(bodyParser.urlencoded({extended: false}));

class CommWays {
    constructor(router, model) {
        // 路由
        this.router = router;
        // 模型
        this.model = model;
    }

    /**
     * 保存
     * @param router 路由
     * @param model 模型名称
     * @return {*}
     */
    save() {
        return this.router.post('/save', (async (req, res) => {
            const {body} = req;
            if (!body.id) {
                if (body.id === '' || body.id === null) {
                    delete body.id;
                }
                resWithSuccess.data = await this.model.create(req.body);
            } else {
                resWithSuccess.data = await this.model.update(body, {
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
    findByPage() {
        return this.router.post('/findByPage', (async (req, res) => {
            const {body} = req;
            if (!body) throw new Error('查询参数不能为空！');

            let searchParams = {};
            const { current,pageSize,order,whereArr} = body;

            if(pageSize){
                searchParams.limit = pageSize;
            }
            if(current){
                searchParams.offset = Number(pageSize) * current
            }
            if(order){
                searchParams.order = order
            }
            if(whereArr){
                searchParams.where = {
                    [Op.or]:whereArr
                }
            }

            resWithSuccess.data = await this.model.findAll(body);
            res.json(resWithSuccess);
        }))
    }

    /**
     *
     * @param router
     * @param model
     */
    delById() {
        return this.router.delete('/deleteById', (async (req, res) => {
            const {id} = req.body;
            const instance = await this.model.destroy({
                where: {
                    id: id
                }
            })
            if (!instance) {
                res.json(Response.resWithFail('删除失败', instance))
            }
            res.json(Response.resWithSuccess('删除成功', instance))
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
