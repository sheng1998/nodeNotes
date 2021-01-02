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

// 删除数据
// User.remove({
//     username: 'sheng1'
// }, (err, data) => {
//     if(err) {
//         console.log('删除失败！')
//     } else {
//         console.log('删除成功！')
//     }
// })

// 根据 ID 查找数据并删除
// User.findByIdAndDelete('5ff0131fd9b93428b85be0c7', (err, data) => {
//     if(err) {
//         console.log('删除失败！')
//     } else {
//         console.log(data)
//         console.log('删除成功！')
//     }
// })

// 删除满足条件的一条数据
User.findOneAndDelete({
    'username': 'sheng'
}, (err, data) => {
    if(err) {
        console.log('删除失败！')
    } else {
        console.log(data)
        console.log('删除成功！')
    }
})

