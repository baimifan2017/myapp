/**
 * @author lzh
 * @desc: 服务层
 * @date:2021-04-16
 */

const {sequelize, Sequelize} = require('../../db/init')
const {dLogin} = require('../../dao/dao_config/user')
const User = require('../../models/config/User')
const File = require('../../models/config/File')
const moment = require('moment');
const BaseService = require('../../service/module_comm/BaseService')
const Jwt = require('../module_comm/Jwt')
const PurchaseHeader = require('../../models/purchase/PurchaseHeader')
const PurchaseItem = require('../../models/purchase/PurchaseItem')

const {resWithSuccess, resWithFail, pagingRes} = require('../../comm/response')


const Op = Sequelize.Op;

class PurchaseService extends BaseService {
    constructor() {
        super();
    }


    /**
     * 保存申请单
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    saveApply = async (req, res, next) => {
        let {header, items} = req.body;
        const tran = await sequelize.transaction();

        const currentNow = moment(new Date()).format('YYYYMMDDhhmmss')
        const myApplyNo = `CG_${currentNow}`;

        let instance;
        try {
            if (!header.id) {
                header.applyNo = myApplyNo;
                instance = await PurchaseHeader.create({...header}, {
                    transaction: tran
                });
            } else {
                await PurchaseHeader.update(header, {
                    where: {
                        id: header.id
                    },
                    transaction: tran
                })
            }

            items.map((item) => {
                item.purchaseHeaderId = instance ? instance.dataValues.id : header.id;
                item.applyNo = myApplyNo;
            })


            // updateOnDuplicate 如果主键冲突就执行更新操作
            await PurchaseItem.bulkCreate(items, {
                updateOnDuplicate: ['name', 'specification','unitPrice','amount','remark'],
                transaction: tran
            });

            await (await tran).commit();
            resWithSuccess.data = instance;
            res.json(resWithSuccess)
        } catch (error) {
            next(error)
            resWithFail.data = instance;
            res.json(resWithFail)
            await (await tran).rollback();
        }
    }

    /**
     * 查询申请单头信息
     * @param req
     * @param res
     * @param next
     */
    findHeaderByPage = async (req, res, next) => {
        let {body, body: {current, pageSize}} = req;
        const searchParams = this.buildSearchParam(body);
        try {
            const instance = await PurchaseHeader.findAndCountAll(searchParams);
            res.json(Response.pagingRes(current, pageSize, instance));
        } catch (error) {
            next(error)
        }
    }

    /**
     * 查询申请单行项目
     * @param req
     * @param res
     * @param next
     */
    findItems = (req, res, next) => {
        let {body} = req;
        const searchParams = this.buildSearchParam(body);
        try {
            const instance = PurchaseItem.findAll(searchParams);
            res.json(Response.resResponse(instance));
        } catch (error) {
            next(error)
        }
    }
}


module.exports = PurchaseService;
