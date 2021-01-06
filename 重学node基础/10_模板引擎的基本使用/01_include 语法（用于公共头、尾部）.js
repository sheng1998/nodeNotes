// 引入 express 包
let express = require('express')
let path = require('path')

//创建服务器程序
let app = express()

app.use('/public/', express.static(path.join(__dirname, 'public')))

// 在 express 中配置使用 express-art-template 模板引擎
app.engine('html', require('express-art-template'))


// 监听浏览器请求路径
app.get('/', (request, response) => {
    // 默认情况下，express 会到 views 目录下，找到 index.html 文件
    response.render('index.html', {
        title: '标题',
        content: '内容'
    })
})

app.get('/include', (request, response) => {
    response.render('main.html', {
        content: '我是内容'
    })
})

// 监听服务器端口
app.listen(3000, () => {
    console.log('监听端口：3000！')
})
