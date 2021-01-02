# mongodb 的基本使用

## 下载安装 mongodb

官方下载地址：https://www.mongodb.com/try/download/community

<br>

## 配置环境变量

将 MongoDB 安装目录下的 bin 路径添加到 环境变量中
默认情况下的路径如下：
```
C:\Program Files\MongoDB\Server\4.2\bin
```

当在命令行窗口输入
```shell
mongod --version
```
可以显示 mongodb 版本号时，证明安装和环境配置成功(如下)。
```shell
db version v4.2.0
git version: a4b751dcf51dd249c5865812b390cfd1c0129c30
...
```

<br>

## 开启和关闭 mongodb

**开启：**
在命令行窗口输入：
```shell
mongod
```
启动 mongodb 服务，启动成功的前提是存在`C:\data\db`目录,如果不存在，需要手动创建，或者指定启动目录（该指定目录将成为数据保存的目录）
```shell
mongod --dbpath=指定目录
```

**关闭：**
直接在启动 mongodb 的窗口按住 Ctrl+C 退出 MongoDB 服务，也可以直接关闭启动服务的命令行窗口。

<br>

## 连接数据库
连接数据库的前提是数据库已经开启
**连接：**
```shell
# 默认连接本机的 MongoDB 数据库
momgo
```

**退出：**
```shell
# 在连接状态输入 exit 退出连接
exit
```

<br>

## 查看显示所有数据库
```shell
show dbs
```

<br>

## 查看当前操作的数据库
默认情况下当前操作数据库为 `test`
```shell
db
```

<br>

## 切换/新建数据库
下面语句可以切换到制定的数据库，如果没有该数据库就创建新的数据库
```shell
use 数据库名称
```

<br>

## 插入数据
常用的方法有：**db.collection.insertOne()** 和 **db.collection.insertMany()**

**db.collection.insertOne()**
例如：
```shell
db.students.insertOne({"name": "sheng"})
```

**db.collection.insertMany()**
```shell
db.students.insertMany(
    [
        {"name":"li","age": 22},
        {"name":"wang","age": 20}
    ]
)
```

<br>

## 查看数据库中的集合（表）
```shell
show collections
```

<br>

## 查询数据库
```shell
# 查询 students 表中所有数据,相当于 select * from students
db.students.find()

# 查询 students 表中所有数据并格式化
db.students.find().pretty()
```

### 条件查询
与关系型数据库的对比（使用 SQL 语句）
| 操作 | 格式              | mongodb 语句                        | SQL 语句           |
| ---- | ----------------- | ----------------------------------- | ------------------ |
| 等于 | {\<key>:\<value>} | db.students.find({"name": "sheng"}) | where name = 'sheng' |
| 小于 | 	{\<key>:{$lt:\<value>}} | db.students.find({"age": {$lt:50}}) | where age < 50 |
| 小于或等于 | 	{\<key>:{$lte:\<value>}} | db.students.find({"age": {$lte:50}}) | where age <= 50 |
| 大于 | 	{\<key>:{$gt:\<value>}} | db.students.find({"age": {$gt:20}}) | where age > 20 |
| 大于或等于 | 	{\<key>:{$gte:\<value>}} | db.students.find({"age": {$gte:20}}) | where age >= 20 |
| 不等于 | 	{\<key>:{$ne:\<value>}} | db.students.find({"age": {$ne:40}}) | where age != 40 |

<br>

### MongoDB AND 条件
```shell
db.students.find({"name":"li", "age": 20})
```

<br>

### MongoDB OR 条件
```shell
db.students.find({$or:[{"name":"li"},{"age": {$gte: 20}},{'name':'sheng'}]})
```

<br>

## 使用 mongoose 操作 MongoDB 数据库
以下代码在 node 环境下运行：
```javascript
//  引入 mongoose 包
let mongoose = require('mongoose')

// 连接 MongoDB 数据库
mongoose.connect('mongodb://localhost:27017/test')

// 创建一个数据库模型， Cat 是数据库中表的名称
const Cat = mongoose.model('Cat', { name: String });

// 实例化一个 Cat 对象
const kitty = new Cat({ name: 'Zildjian' });

// 持久化保存 kitty 实例
kitty.save().then(() => console.log('meow'));
```

### 增加数据
```javascript
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
```

<br>

### 删除数据
以数组的形式返回被删除的数据集
```javascript
User.remove({
    username: 'sheng'
}, (err, data) => {
    if(err) {
        console.log('删除失败！')
    } else {
        console.log('删除成功！')
    }
})
```

#### 根据 ID 查找数据并删除
返回被返回的数据
```javascript
User.findByIdAndDelete('5ff0131fd9b93428b85be0c7', (err, data) => {
    if(err) {
        console.log('删除失败！')
    } else {
        console.log('删除成功！')
    }
})
```

<br>

#### 删除满足条件的一条数据
返回被返回的数据
```javascript
User.findOneAndDelete({
    'username': 'sheng'
}, (err, data) => {
    if(err) {
        console.log('删除失败！')
    } else {
        console.log('删除成功！')
    }
})
```

<br>

### 修改数据

#### 根据 ID 查找数据并更新
返回更新前的数据
```javascript
User.findByIdAndUpdate('5ff00c334c612212a00c5d4e', {
    'password': 'abc'
}, (err, data) => {
    if(err) {
        console.log('更新失败！')
    } else {
        console.log('更新成功！')
    }
})
```

#### 根据条件更新数据
经过测试只会更新查询到的第一条数据，同时也存在 `updateOne` 方法
```javascript
User.update({
    'username': 'sheng'
}, {
    'password': 'abc123'
}, (err, data) => {
    if(err) {
        console.log('更新失败！')
    } else {
        console.log('更新成功！')
    }
})
```

<br>

### 查询数据

#### 查询所有数据
```javascript
User.find((err, data) => {
    if(err) {
        console.log('查询失败！')
    } else {
        console.log(data)
    }
})
```

<br>

#### 查询表的第一条数据
```javascript
User.findOne((err, data) => {
    if(err) {
        console.log('查询失败！')
    } else {
        console.log(data)
    }
})
```

<br>

#### 根据条件查询数据
根据条件查询数据（以数组形式返回一个满足条件的数据集），`find` 方法的第一个参数指定查询的条件，该参数为对象，可以指定多个查询条件，`findOne` 返回满足条件的一条数据。
```javascript
User.find({ 'username': 'ta', 'age': 19}, (err, data) => {
    if(err) {
        console.log('查询失败！')
    } else {
        console.log(data)
    }
})
```

<br>

#### 根据 ID 查询数据
返回结果只有一条数据（因为 id 是唯一的）
```javascript
User.findById('5ff00c363f52cf2dc0c9903a', (err, data) => {
    if(err) {
        console.log('查询失败！')
    } else {
        console.log(data)
    }
})
```









