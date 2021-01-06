// 引入 express 包
let express = require('express')
let path = require('path')

//创建服务器程序
let app = express()

// 公开指定目录(通过http://127.0.0.1:3000/public/test.js 访问)
app.use('/public/', express.static(path.join(__dirname, 'public')))
// 当省略第一个参数的时候，可以直接通过路径: http://127.0.0.1:3000/test.js , 访问 public 目录的资源 test.js
// app.use(express.static(path.join(__dirname, 'public')))

// 在 express 中配置使用 express-art-template 模板引擎
app.engine('html', require('express-art-template'))
// 需要注意的是 express-art-template 依赖 art-template 模块，所以必须也要安装 art-template 包
// 上面的第一个参数说明，在渲染以 .html 结尾的文件时，使用 express-art-template 模板引擎处理。
// express-art-template 是专门用来在 express 中把 art-template 整合到 express 中的包。


// express 为 response 相应对象提供了一个方法：render, 该方法默认情况下是不可以使用的，当配置了模板引擎就可以使用了
// 用法：response.render('html模板名', {模板数据})
// 第一个参数指定模板文件，默认会到服务器入口文件所在目录的 views 目录中寻找
// 也可以修改该目录，如下：
// app.set('views', render 函数的默认路径)


// 监听浏览器请求路径
app.get('/', (request, response) => {
    // 默认情况下，express 会到 views 目录下，找到 index.html 文件
    response.render('index.html', {
        title: '标题',
        content: '内容'
    })
})

// 监听服务器端口
app.listen(3000, () => {
    console.log('监听端口：3000！')
})
