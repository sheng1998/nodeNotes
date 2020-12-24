// 引入 express 包
let express = require('express')
let path = require('path')

// 引入 body-parser 包，处理 post 请求的数据
let bodyParser = require('body-parser')

//创建服务器程序
let app = express()

// 公开 public 目录
app.use('/public/', express.static(path.join(__dirname, 'public')))

// 配置使用模板引擎
app.engine('html', require('express-art-template'))

// 配置 body-parser 中间件，专门处理解析表单 post 请求体
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// 评论数据
let obj = {
    comments: [
        '床前明月光，疑是地上霜。举头望明月，低头思故乡。',
        '一闪一闪亮晶晶，满天都是小星星。',
        '远看山有色，近听水无声。春去花还在，人来鸟不惊。'
    ]
}

// 监听浏览器请求路径
app.get('/', (request, response) => {
    // 重定向至首页
    response.redirect('/index.html')
})
app.get('/index.html', (request, response) => {
    // 渲染首页
    response.render('index.html', obj)
})

// 渲染评论页面
app.get('/comment.html', (request, response) => {
    response.render('comment.html')
})

// 处理提交的评论数据
app.post('/content', (request, response) => {
    // 获取评论数据，添加到评论列表，并重定向至首页
    // console.log(request.body.comment)
    obj.comments.unshift(request.body.comment)
    response.redirect('/index.html') // 重定向到首页
})

// 监听服务器端口
app.listen(3000, () => {
    console.log('监听端口：3000！')
})