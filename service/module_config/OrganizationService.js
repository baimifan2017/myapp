const BaseService = require('../module_comm/BaseService')
const {resWithSuccess, resWithFail} = require('../../comm/response')

class OrganizationService extends BaseService {
    constructor(router, model) {
        super(router, model);
    }
}

module.exports = OrganizationService;