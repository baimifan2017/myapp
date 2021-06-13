// 1.引入mongoose
const mongoose = require('mongoose');
const {mongoClient} = require('../../db/init')
const {Schema} = mongoose;

//3、操作users表（集合）   定义一个Schema
//Schema里面的对象和数据库表里面的字段需要一一对应
const mySchema = Schema({
    originalName: String, // 文件名称
    size: Number,
    path: String,
    destination: String, // 相对路径
    mimetype: String, // 文件类型
    fileType: String,
    isLinked:{
        type:Boolean,
        defaultValue:false
    }
}, {
    timestamps: { // 自动增加时间戳
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})

//4、定义数据库模型  操作数据库
// model里面的第一个参数 要注意：
//1首字母大写
//2要和数据库表（集合 ）名称对应  这个模型会和模型名称相同的复数的数据库表建立连接
// var User=mongoose.model('TemFile',UserSchema);    // 默认会操作 TemFile（集合）
const File = mongoClient.model('File', mySchema, 'tb_files')

//5、查询users表的数据
// TemFile.find({}, function (err, doc) {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log(doc);
// })


//6、增加数据
// 6.1实例化 Model ，通过实例化User Molde 创建增加的数据
//6.2 实例.save()

// var u=new File({
//     name:'李四',
//     age:20,
//     status:1
// });

// File.save(function (err) {//执行增加操作
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log('成功')
// }).then( r => { {
//     console.log('rr',r)
// }});

//7、更新数据
// File.updateOne(
//     {"_id":"5b7563e2ba3c6747d0612204"},
//     {"name":"yangyi123"},
//     function(err,doc){
//         if(err){
//                 return console.log(err);
//             }
//             console.log(doc)
//     })


//8、删除数据
// TemFile.deleteOne({"_id": "5b7563e2ba3c6747d0612204"}, (err, result) => {
//     if (err) {
//         return console.log(err);
//     }
//     console.log(result)
// })
//


module.exports = {
    File
}