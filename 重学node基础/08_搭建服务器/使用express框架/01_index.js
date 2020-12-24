// 引入 express 包
let express = require('express')
let path = require('path')

//创建服务器程序
let app = express()

// 公开指定目录(通过http://127.0.0.1:3000/public/test.js 访问)
app.use('/public/', express.static(path.join(__dirname, 'public')))
// 当省略第一个参数的时候，可以直接通过路径: http://127.0.0.1:3000/test.js , 访问 public 目录的资源 test.js
// app.use(express.static(path.join(__dirname, 'public')))

// 监听浏览器请求路径
app.get('/', (request, response) => {
    response.end('111')
})
// 监听浏览器请求路径
app.get('/get', (request, response) => {
    response.send('get')
})

// 监听服务器端口
app.listen(3000, () => {
    console.log('监听端口：3000！')
})
