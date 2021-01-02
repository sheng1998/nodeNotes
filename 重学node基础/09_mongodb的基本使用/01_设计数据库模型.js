// 引入 mongoose 包
let mongoose = require('mongoose')

// 连接数据库，表示连接本机名为 user 的数据库
// localhost 表示连接本机数据库，数据库不需要一定存在，如果不存在，当插入第一条数据的时候该数据库就会被创建
mongoose.connect('mongodb://localhost/user')

// 设计集合/文档结构（表结构）
// 字段名称就是表结构的属性名称
let userSchema = new mongoose.Schema({
    username: {
        type: String, // 规定该字段为 String 类型
        required: true // 规定该字段必须提供
    },
    password: {
        type: String,
        required: [true, '请提供密码'] // 规定该字段必须提供，如果不提供就返回错误信息：请提供密码
    },
    email: {
        type: String,
        required: function() { 
            // console.log(this) // 这里的 this 指代下面的 user
            return this.sex === 2
        }
    },
    age: {
        type: Number,
        required: true,
        min: [18, '年龄太小'], // 规定该字段的最小值为 18，如果值小于 18 就返回错误信息：年龄太小
        max: 22 // 规定该字段的最大值
    },
    sex: {
        type: Number,
        required: true,
        enum: [0, 1, 2] // 规定该字段可选值为数组中的元素
    }
})

// 需要保存到表结构中的数据信息
let user = {
    username: 'sheng',
    password: '123',
    email: '2642336565@qq.com',
    age: 18,
    sex: 2
}

// 将集合/文档结构发布为模型
// 方法中的第一个参数规范为参入一个大写的名字单数字符串，该字符串作为数据库中表的名称
//      mongoose 会自动将大写名词单数生成小写复数的集合名称（User --> users, 因此，因此表名为 users)
// 第二个参数为架构 SChema
// 返回值为模型构造函数
let User = mongoose.model('user', userSchema)

// 创建构造函数的实例对象
let sheng = new User(user)

// 将实例对象中的数据信息保存到表结构中
sheng.save().then(() => {
    console.log('保存成功！')
}, err => {
    console.log(err.errors)
})

