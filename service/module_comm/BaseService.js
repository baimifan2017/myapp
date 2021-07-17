import {model} from "mongoose";

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
        if(value.id){
            this.model.create(value,option)
        }else {
            this.model.update(value, option)
        }

    }
}