let mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/user')

let userSchema = new mongoose.Schema({
    username: {
        type: String, // 规定该字段为 String 类型
        required: true // 规定该字段必须提供
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

let User = mongoose.model('user', userSchema)

// 根据 ID 查找数据并更新
// User.findByIdAndUpdate('5ff00c334c612212a00c5d4e', {
//     'password': 'abc'
// }, (err, data) => {
//     if(err) {
//         console.log('更新失败！')
//     } else {
//         console.log(data)
//         console.log('更新成功！')
//     }
// })

// 根据条件更新数据（经过测试只会更新查询到的第一条数据）
// User.update({
//     'username': 'sheng'
// }, {
//     'password': 'abc123'
// }, (err, data) => {
//     if(err) {
//         console.log('更新失败！')
//     } else {
//         console.log(data)
//         console.log('更新成功！')
//     }
// })

// 根据条件更新一条数据
// User.updateOne({
//     'username': 'sheng'
// }, {
//     'password': 'abc123'
// }, (err, data) => {
//     if(err) {
//         console.log('更新失败！')
//     } else {
//         console.log('更新成功！')
//     }
// })

