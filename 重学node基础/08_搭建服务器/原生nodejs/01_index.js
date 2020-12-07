// 引入 http 模块
let http = require('http');

// 设置服务器端口号为 8080
const POST = 8080;

// 创建服务器
let server = http.createServer()

// 服务器监听 request 事件
server.on('request', (request, response) => {
    let urlRoot = `http://127.0.0.1:${POST}`
    console.log('收到客户端请求！')

    // 设置响应数据类型
    // response.setHeader('Content-Type', 'text/plain; charset=utf-8')
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    switch (request.url) {
        // 当客户端请求路径为 / 时的操作（通过 request.url 拿到客户端请求路径）
        case '/':
            console.log(`客户端访问的地址是：${urlRoot}${request.url}`)
            console.log(`客户端的请求路径是：${request.url}`)
            // 向客户端发送数据
            response.write(`<h1>你好</h1>`)
            break;
        case '/login':
            console.log(`客户端访问的地址是：${urlRoot}${request.url}`)
            console.log(`客户端的请求路径是：${request.url}`)
            response.write(`登录`)
            break;
        case 'register':
            console.log(`客户端访问的地址是：${urlRoot}${request.url}`)
            console.log(`客户端的请求路径是：${request.url}`)
            response.write(`注册`)
            break;
    
        default:
            console.log(`客户端访问的地址是：${urlRoot}${request.url}`)
            console.log(`客户端的请求路径是：${request.url}`)
            response.write(`404 Not Found!`)
            break;
    }
    
    // 服务端向客户端的响应结束
    response.end()
})

// 监听端口号 8080
server.listen(POST, () => {
    console.log(`服务器已经启动，可以通过 http://127.0.0.1:${POST} 访问。`)
})
