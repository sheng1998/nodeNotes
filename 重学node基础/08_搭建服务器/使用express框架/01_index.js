// 引入 express 包
let express = require('express')

//创建服务器程序
let app = express()

// 公开指定目录
app.use('/public/', express.static('./public/'))

// 监听浏览器请求路径
app.get('/', (request, response) => {
    response.end('111')
})

// 监听服务器端口
app.listen(3000, () => {
    console.log('监听端口：3000！')
})
