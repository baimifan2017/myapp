/**
 * 初始化mongodb
 */

let MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const {resWithSuccess, resWithFail} = require('../../comm/response')

/**
 * 数据库地址
 * 在cmd中通过mongo命令查看url
 * */
const url = 'mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb';

class Mongo {

    /**
     * @param dbName 数据库名称
     * @param collectionName 表名称
     */
    constructor(dbName, collectionName) {
        new Promise(resolve => {
            MongoClient.connect(url, (err, db) => {
                if (db) {
                    resolve({
                        conn: db,
                        myDb: db.db(dbName).createCollection(collectionName),
                        temDb: db.db("tem_collection")
                    })
                }
            })
        }).then(res => {
            if (res) {
                const {myDb, temDb, coon} = res;
                // 永久存储数据库
                this.db = myDb;
                // 临时表
                this.temDb = temDb;
                // 连接
                this.coon = coon;
            }
        })
    }

    /**
     * 页面新增，先将数据存储在临时表;
     * @param {Array} paramArr
     * @returns {Promise<void>}
     */
    uploadToTem = async (paramArr) => {

        console.log(this.temDb,'temDb')
        await this.temDb.insertMany(paramArr);
    }

    /**
     * 将数据从临时表中存至真正db中
     * @param params
     * @returns {Promise<void>}
     */
    temToDb = async (whereStr) => {
        try {
            const params = await this.temDb.find(whereStr);
            await this.db.insertMany(params);
            await this.temDb.deleteMany(params)
        } catch (e) {
            throw(e)
        }
    };

    /**
     * 直接将文件存至数据库
     * @param pathName
     * @param whereStr
     * @returns {Promise<void>}
     */
    filesToDb = async (pathName, whereStr) => {

    };


    addFile = async (pathName) => {
        fs.mkdir(`./public/${pathName}/`, (err => {
            if (err) {
                console.error(err)
            }
            return resWithSuccess.data = '新建文件夹成功！'

        }))
    }

    delFile = async (pathName) => {
        const curPath = `./public/${pathName}`;
        fs.unlink(curPath, (err => {
            if (err) {
                console.error(err)
            }
            return resWithSuccess.data = '删除成功！'
        }))
    }


    /**
     *
     * @param arrParams
     * @returns {Promise<*>}
     */
    insertMany = async (arrParams) => {
        const re = await this.db.insertMany(arrParams);
        return re;
    }

    /**
     * 插入一条数据
     * @param params
     * @returns {Promise<*>}
     */
    insertOne = async (params) => {
        const re = await this.db.insertOne(params);
        return re;
    };

    /**
     * 删除多条
     * @param whereStr
     * @returns {Promise<*>}
     */
    deleteMany = async (whereStr) => {
        const re = await this.db.deleteMany(whereStr);
        return re;
    }

    /**
     * 更新数据
     * @param whereStr
     * @param params
     * @returns {Promise<*>}
     */
    updateMany = async (whereStr, params) => {
        const re = await this.db.updateMany(whereStr, {$set: {...params}});
        return re;
    };

    /**
     * @param whereStr
     * @returns {Promise<void>}
     */
    find = async (whereStr) => {
        const arr = await this.db.find(whereStr).toArray();
    };

    /**
     * 关闭数据库，执行完后必须关闭
     * @returns {Promise<void>}
     */
    close = async () => {
        this.coon.close();
        console.info('mongodb一已经关闭');
    }
}

module.exports = Mongo;
