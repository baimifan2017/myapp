const express = require('express');
const fs = require('fs');
const multer = require('multer');
const { File }  = require('../../service/module_comm/MongooseService')

const app = express();

// 默认网盘目录，存在则不创建，不存在则创建
const USER_DISK_NAME = 'user_disk';

// 设置保存规则
const initStore = (pathName) => {
    return multer.diskStorage({
        // 存储文件地址
        destination: (req, file, cb) => {
            // const url = path.resolve(__dirname, `../../static/${USER_DISK_NAME}/${pathName}`)
            const url = `./static/${USER_DISK_NAME}/${pathName}`
            if (!fs.existsSync(url)) {
                fs.mkdirSync(url)
            }
            cb(null, url)
        },

        // 设置保存文件名称
        filename: (req, file, cb) => {
            // 获取当前时间戳
            const extra = Math.floor(Date.now() / 1000);
            cb(null, extra + '_' + file.originalname)
        }
    })
}

// 设置规律规则（可选）
const initFilter = (req, file, cb, accept) => {
    let acceptableMime = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']
    if (accept) {
        acceptableMime = accept
    }

    //微信公众号只接收上述四种类型的图片
    if (acceptableMime.indexOf(file.mimetype) !== -1) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

/**
 *
 * @param {Array} accept 可解释文件类型
 * @param { Number} maxCount 最大上传数量
 * @param { String} pathName 文件路径
 * @returns {*}
 */
const uploader = (accept, maxCount = 20, pathName) => {
    return multer({
        storage: initStore(pathName),
        // fileFilter: (r, f, c) => initFilter(r, f, c, accept),
        limits: {
            fieldSize: '200MB'
        }
    }).array('file', maxCount)
}

app.post('/upload', uploader(null, 20, 'temFiles'), async (req, res) => {
    const {files, type} = req;

    let myParams = [];
    if (files && files.length > 0) {
        files.forEach(item => {
            myParams.push({
                originalName: item.originalname, // 文件名称
                size: item.size,
                path: item.path,
                destination: item.destination, // 相对路径
                mimetype: item.mimetype, // 文件类型
                fileType: type,
                isLinked:false,
            })
        })
    }
    await File.create(myParams, (err, docs) => {
        if (!err) {
            res.json(...docs)
        }
    })
})


app.delete('/del', (req,res) => {
    const { id } = req.body;
    File.findByIdAndDelete({_id:id},(err,docs) => {
         if(!err){
             res.json({
                 success:true,
                 msg:'删除成功！'
             })
         }
     })
})
// 附件下载、预览
app.use('/download',express.static('static'))

module.exports = app;