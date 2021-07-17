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
        return this.router.post('/save', (async (req, res, next) => {
            const {body} = req;
            try {
                if (!body.id) {
                    if (body.id === '' || body.id === null) {
                        delete body.id;
                    }
                    await this.model.create(req.body);

                } else {
                    await this.model.update(body, {
                        where: {
                            id: body.id
                        }
                    })
                }

                resWithSuccess.data = body;
                res.json(resWithSuccess);
            } catch (err) {
                next(err)
            }
        }))
    }

    /**
     * 分页查询
     * @param router
     * @param model
     * @return {*}
     */
    findByPage(option) {
        return this.router.post('/findByPage', (async (req, res, next) => {
            const {body} = req;
            if (!body) throw new Error('查询参数不能为空！');

            try {
                const searchParams = this.buildSearchParam(body);
                resWithSuccess.data = await this.model.findAll(searchParams);
                res.json(resWithSuccess);
            } catch (err) {
                next(err)
            }
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
                    id: {
                        [Op.in]: [...id]
                    }
                }
            })
            if (!instance) {
                res.json(Response.resWithFail('删除失败', instance))
            }
            res.json(Response.resWithSuccess('删除成功', instance))
        }))
    }

    /**
     * 根据id进行查询
     * @param includeAlias 关联model别名
     * @returns {*}
     */
    findOneById(includeAlias) {
        return this.router.get('/findOneById', (async (req, res) => {
            const {query} = req;
            let searchParam = {};
            if (query.id) {

                if (includeAlias) {
                    searchParam.include = includeAlias
                }
                searchParam.where = {
                    id: query.id
                }

                const instance = await this.model.findOne(searchParam)

                if (!instance) {
                    res.json(Response.resWithFail('查询失败', instance))
                } else {
                    res.json(Response.resWithSuccess('查询成功', instance))
                }
            }
        }))
    }

    /**
     * 树形结构
     * @param includeArg
     * @returns {*}
     */
    findTree(includeArg) {
        return this.router.get('/findTree', (async (req, res, next) => {
            const {body} = req;

            try {
                let searchParams;
                if (Object.keys(body).length > 0) {
                    searchParams = this.buildSearchParam(body, includeArg)
                }
                // 禁止返回数据的model封装
                searchParams = {...searchParams, ...{raw: true}}
                const instance = await this.model.findAll(searchParams)

                if (!instance) {
                    res.json(Response.resWithFail('查询失败', instance))
                } else {
                    const data = this.buildTree(instance)
                    res.json(Response.resWithSuccess('查询成功', data))
                }
            } catch (err) {
                next(err)
            }
        }))
    }


    /**
     * 构造树形数据
     * @param data array 类型
     * @return {[]}
     */
    buildTree(data) {
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
                if (item.pid == id) {
                    item.children = getNode(item.id);
                    node.push(item);
                }
            }
            if (node.length === 0) return;
            return node;
        }

        return res;
    }

    /**
     * 构建查询
     * @param params
     * @param includeArg
     * @returns {*}
     */
    buildSearchParam = (body, includeArg) => {
        let searchParams = {};
        const {
            current = undefined,  // 当前页
            pageSize = undefined, // 当前分分页大小
            order = undefined, // 排序方式
            whereArr = undefined, // 过滤条件
            fields = undefined // 向前端返回内容过滤
        } = body;
        if (pageSize) {
            searchParams.limit = pageSize;
        }
        if (current) {
            searchParams.offset = Number(pageSize) * (current - 1)
        }
        if (order) {
            searchParams.order = order
        }
        if (whereArr && Array.isArray(whereArr)) {
            searchParams.where = {
                [Op.or]: whereArr
            }
        }
        if (fields && Array.isArray(fields)) {
            searchParams.fields = fields
        }
        if (includeArg) {
            searchParams.include = includeArg
        }
        return searchParams;
    }
}


module.exports = CommWays;
