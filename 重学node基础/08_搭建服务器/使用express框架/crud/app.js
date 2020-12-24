// 引入 express 包
let express = require('express')
// 引入 path 包
let path = require('path')
// 引入 body-parser 包，处理 post 请求的数据
let bodyParser = require('body-parser')

// 引入路由模块
let router = require('./router')

// 实例化 express 对象
let app = express()
// 端口号
let PORT = 8080

// 公开 public 目录
app.use('/public/', express.static(path.join(__dirname, 'public')))
// 配置使用模板引擎
app.engine('html', require('express-art-template'))
// 配置 body-parser 中间件，专门处理解析表单 post 请求体
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// 把路由模块挂载到 app 服务中
app.use(router)

// 监听端口
app.listen(PORT, () => {
    console.log(`服务器已经启动，监听端口号：${PORT}`)
})
