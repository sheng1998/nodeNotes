// 引入 require 模块
const readline = require('readline')

// 创建 readline 接口实例
let r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// 设置提问事件
r1.question('你的名字是？', name => {
    console.log(`谢谢你${name}!`)
    r1.close()
})

// 关闭事件监听
r1.on('close', () => {
    process.exit(0)
})
