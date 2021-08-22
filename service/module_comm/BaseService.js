const {Op} = require("sequelize");

class BaseService {

    constructor(model) {
        this.model = model;
    }

    /**
     * 保存、更新
     * @param value
     * @param option
     */
    save = (value, option) => {
        if (value.id) {
            this.model.create(value, option)
        } else {
            this.model.update(value, option)
        }
    }


    /**
     * 保存、更新
     * @param value
     * @param option
     */
    findByPage = async (option) => {
        const myOption = this.buildSearchParam(option)
        return await this.model.findAndCountAll(myOption)
    }


    /**
     *
     * @param router
     * @param model
     */
    delById = async (id) => {
        return await this.model.destroy({
            where: {
                id: {
                    [Op.in]: [id]
                }
            }
        })
    }

    /**
     * 构建查询
     * @param params
     * @param includeArg
     * @returns {*}
     */
    buildSearchParam = (body = {}, includeArg) => {
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


module.exports = BaseService;