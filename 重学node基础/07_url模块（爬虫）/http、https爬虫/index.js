// 引入 http 模块
let https = require('https')

// http://www.itheima.com/teacher.html
// 创建请求对象，此时未发送请求
let req = https.request('http://www.itheima.com/teacher.html', res => {
    let chunks = []

    // 监听 data 事件，获取传递过来的数据片段
    res.on('data', chunk => {
        // 拼接数据片段
        chunks.push(chunk)
    })

    // 监听 end 事件，获取数据完毕时触发
    res.on('end', () => {
        console.log(Buffer.concat(chunks).toString('utf-8'))
    })
})

// 发送请求
req.end()
