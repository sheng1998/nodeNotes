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

// 查询数据表中所有的数据
User.find((err, data) => {
    if(err) {
        console.log('查询失败！')
    } else {
        console.log(data)
    }
})

// 查询数据表中第一条数据
User.findOne((err, data) => {
    if(err) {
        console.log('查询失败！')
    } else {
        console.log(data)
    }
})

// 根据条件查询数据（以数组形式返回一个满足条件的数据集）
User.find({ 'username': 'ta', 'age': 19}, (err, data) => {
    if(err) {
        console.log('查询失败！')
    } else {
        console.log(data)
    }
})

// 根据 id 查询数据，返回结果只有一条数据（因为 id 是唯一的）
User.findById('5ff00c363f52cf2dc0c9903a', (err, data) => {
    if(err) {
        console.log('查询失败！')
    } else {
        console.log(data)
    }
})
